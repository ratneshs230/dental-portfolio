import { GoogleGenAI, Modality, Type } from "@google/genai";
import { createPcmBlob, decodeAudioData, base64ToUint8Array } from "./audioUtils";
import { getSystemInstruction, TOOL_DESCRIPTIONS } from "./livePrompt";

/**
 * Tool declarations for function calling
 */
const bookAppointmentTool = {
  name: TOOL_DESCRIPTIONS.bookAppointment.name,
  description: TOOL_DESCRIPTIONS.bookAppointment.description,
  parameters: {
    type: Type.OBJECT,
    properties: {
      patientName: { type: Type.STRING, description: TOOL_DESCRIPTIONS.bookAppointment.parameters.patientName },
      age: { type: Type.STRING, description: TOOL_DESCRIPTIONS.bookAppointment.parameters.age },
      gender: { type: Type.STRING, description: TOOL_DESCRIPTIONS.bookAppointment.parameters.gender },
      date: { type: Type.STRING, description: TOOL_DESCRIPTIONS.bookAppointment.parameters.date },
      time: { type: Type.STRING, description: TOOL_DESCRIPTIONS.bookAppointment.parameters.time },
      service: { type: Type.STRING, description: TOOL_DESCRIPTIONS.bookAppointment.parameters.service }
    },
    required: TOOL_DESCRIPTIONS.bookAppointment.required
  }
};

const endSessionTool = {
  name: TOOL_DESCRIPTIONS.endSession.name,
  description: TOOL_DESCRIPTIONS.endSession.description,
  parameters: {
    type: Type.OBJECT,
    properties: {
      reason: { type: Type.STRING, description: TOOL_DESCRIPTIONS.endSession.parameters.reason }
    },
    required: TOOL_DESCRIPTIONS.endSession.required
  }
};

/**
 * Manages the Live API Session (WebSocket)
 */
export class LiveSessionManager {
  constructor(clinicData = {}) {
    this.clinicData = clinicData;
    this.inputAudioContext = null;
    this.outputAudioContext = null;
    this.nextStartTime = 0;
    this.sources = new Set();
    this.sessionPromise = null;
    this.stream = null;
    this.scriptProcessor = null;
    this.inputSource = null;

    // Callbacks
    this.onConnect = () => {};
    this.onDisconnect = () => {};
    this.onError = () => {};
  }

  async connect() {
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                    (typeof window !== 'undefined' ? window.GEMINI_API_KEY : null);

    if (!API_KEY) {
      console.error("Gemini API Key not found!");
      this.onError(new Error("API Key not configured"));
      return;
    }

    try {
      // Initialize audio contexts
      this.inputAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });

      // Get microphone access
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize Google GenAI
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      // Generate system instruction based on clinic data
      const systemInstruction = getSystemInstruction(
        this.clinicData.name,
        this.clinicData.address,
        this.clinicData.phone,
        this.clinicData.services
      );

      console.log("Connecting to Gemini Live API...");

      // Connect to Gemini Live API - store the promise
      this.sessionPromise = ai.live.connect({
        model: 'gemini-2.0-flash-exp',
        callbacks: {
          onopen: () => {
            console.log("Live Session Opened");
            this.startAudioInput();
            // Send initial prompt to trigger AI to speak first
            this.sendInitialGreeting();
            this.onConnect();
          },
          onmessage: (message) => this.handleMessage(message),
          onerror: (e) => {
            console.error("Live Session Error", e);
            this.onError(e);
          },
          onclose: (e) => {
            console.log("Live Session Closed", e);
            this.onDisconnect();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          tools: [{ functionDeclarations: [bookAppointmentTool, endSessionTool] }],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } }
          },
          systemInstruction: systemInstruction,
        }
      });

    } catch (err) {
      console.error("Connection error:", err);
      this.onError(err);
    }
  }

  sendInitialGreeting() {
    // Send a text message to trigger the AI to introduce itself
    this.sessionPromise?.then((session) => {
      console.log("Sending initial greeting trigger...");
      session.sendClientContent({
        turns: [{
          role: "user",
          parts: [{ text: "[Call connected. Please introduce yourself and greet the caller.]" }]
        }],
        turnComplete: true
      });
    }).catch(e => {
      console.error("Error sending initial greeting:", e);
    });
  }

  startAudioInput() {
    if (!this.inputAudioContext || !this.stream || !this.sessionPromise) {
      console.error("Cannot start audio input - missing dependencies");
      return;
    }

    console.log("Starting audio input...");

    this.inputSource = this.inputAudioContext.createMediaStreamSource(this.stream);
    this.scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

    this.scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
      const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
      const pcmBlob = createPcmBlob(inputData);

      // Use the session promise to send audio
      this.sessionPromise?.then((session) => {
        session.sendRealtimeInput({ media: pcmBlob });
      }).catch(e => {
        // Ignore errors when session is closing
      });
    };

    this.inputSource.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.inputAudioContext.destination);

    console.log("Audio input started");
  }

  async handleMessage(message) {
    // Handle Audio Output
    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

    if (base64Audio && this.outputAudioContext) {
      // Ensure time monotonicity
      this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);

      try {
        const audioBuffer = await decodeAudioData(
          base64ToUint8Array(base64Audio),
          this.outputAudioContext,
          24000,
          1
        );

        const source = this.outputAudioContext.createBufferSource();
        source.buffer = audioBuffer;

        // Speed up playback by 10% (1.1x speed)
        source.playbackRate.value = 1.1;

        // Basic gain node for volume control
        const gainNode = this.outputAudioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(this.outputAudioContext.destination);

        source.addEventListener('ended', () => {
          this.sources.delete(source);
        });

        source.start(this.nextStartTime);
        // Adjust duration for faster playback
        this.nextStartTime += audioBuffer.duration / 1.1;
        this.sources.add(source);
      } catch (e) {
        console.error("Error playing audio:", e);
      }
    }

    // Handle Tool Calls (Function Calling)
    if (message.toolCall) {
      console.log("Received tool call:", message.toolCall);
      let shouldEndSession = false;

      const functionResponses = message.toolCall.functionCalls.map(fc => {
        if (fc.name === 'bookAppointment') {
          const { patientName, age, gender, date, time, service } = fc.args || {};
          console.log(`Booking confirmed: ${patientName} (${age}y, ${gender}) - ${date} at ${time} for ${service || 'checkup'}`);
          return {
            id: fc.id,
            name: fc.name,
            response: { result: `Success. Appointment booked for ${patientName} (${age} years, ${gender}) on ${date} at ${time} for ${service || 'dental checkup'}.` }
          };
        }
        if (fc.name === 'endSession') {
          const { reason } = fc.args || {};
          console.log(`AI ending session: ${reason}`);
          shouldEndSession = true;
          return {
            id: fc.id,
            name: fc.name,
            response: { result: `Session ending: ${reason}` }
          };
        }
        return {
          id: fc.id,
          name: fc.name,
          response: { result: "Function not found" }
        };
      });

      // Send the tool response back to the model
      this.sessionPromise?.then((session) => {
        session.sendToolResponse({
          functionResponses: functionResponses
        });
      });

      // If AI wants to end the session, trigger disconnect after a brief delay
      if (shouldEndSession) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('end-live-audio'));
        }, 2000);
      }
    }

    if (message.serverContent?.interrupted) {
      this.stopPlayback();
    }
  }

  stopPlayback() {
    this.sources.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    this.sources.clear();
    this.nextStartTime = 0;
  }

  async disconnect() {
    console.log("Disconnecting...");

    // Stop input
    if (this.scriptProcessor && this.inputSource) {
      try {
        this.inputSource.disconnect();
        this.scriptProcessor.disconnect();
      } catch (e) {}
    }
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
    }
    if (this.inputAudioContext && this.inputAudioContext.state !== 'closed') {
      try {
        await this.inputAudioContext.close();
      } catch (e) {}
    }

    // Stop output
    this.stopPlayback();
    if (this.outputAudioContext && this.outputAudioContext.state !== 'closed') {
      try {
        await this.outputAudioContext.close();
      } catch (e) {}
    }

    // Clear session promise
    this.sessionPromise = null;
  }
}

/**
 * Send text chat message to Gemini
 */
export const sendChatMessage = async (history, newMessage, clinicData = {}) => {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                  (typeof window !== 'undefined' ? window.GEMINI_API_KEY : null);

  if (!API_KEY) {
    return "Voice assistant not configured.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const chat = ai.chats.create({
      model: 'gemini-2.0-flash-exp',
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: getSystemInstruction(
          clinicData.name,
          clinicData.address,
          clinicData.phone,
          clinicData.services
        ),
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I apologize, I could not generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "An error occurred.";
  }
};
