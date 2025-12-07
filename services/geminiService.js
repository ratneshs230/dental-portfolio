import { GoogleGenAI, Modality } from "@google/genai";
import { createPcmBlob, decodeAudioData, base64ToUint8Array } from "./audioUtils";
import { getSystemInstruction, TOOL_DESCRIPTIONS } from "./livePrompt";

/**
 * Manages the Live API Session (WebSocket) for real-time voice conversation
 */
export class LiveSessionManager {
  constructor(clinicData = {}) {
    this.clinicData = clinicData;
    this.inputAudioContext = null;
    this.outputAudioContext = null;
    this.nextStartTime = 0;
    this.sources = new Set();
    this.session = null;
    this.stream = null;
    this.scriptProcessor = null;
    this.inputSource = null;
    this.isConnected = false;

    // Callbacks
    this.onConnect = () => {};
    this.onDisconnect = () => {};
    this.onError = () => {};
    this.onTranscript = () => {};
  }

  async connect() {
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                    (typeof window !== 'undefined' ? window.GEMINI_API_KEY : null);

    if (!API_KEY) {
      console.error("Gemini API Key not found!");
      console.log("To enable voice: Set NEXT_PUBLIC_GEMINI_API_KEY in .env.local");
      this.onError(new Error("API Key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY"));
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

      // Build tool declarations
      const bookAppointmentTool = {
        name: TOOL_DESCRIPTIONS.bookAppointment.name,
        description: TOOL_DESCRIPTIONS.bookAppointment.description,
        parameters: {
          type: "OBJECT",
          properties: {
            date: { type: "STRING", description: TOOL_DESCRIPTIONS.bookAppointment.parameters.date },
            time: { type: "STRING", description: TOOL_DESCRIPTIONS.bookAppointment.parameters.time },
            service: { type: "STRING", description: TOOL_DESCRIPTIONS.bookAppointment.parameters.service }
          },
          required: TOOL_DESCRIPTIONS.bookAppointment.required
        }
      };

      const endSessionTool = {
        name: TOOL_DESCRIPTIONS.endSession.name,
        description: TOOL_DESCRIPTIONS.endSession.description,
        parameters: {
          type: "OBJECT",
          properties: {
            reason: { type: "STRING", description: TOOL_DESCRIPTIONS.endSession.parameters.reason }
          },
          required: TOOL_DESCRIPTIONS.endSession.required
        }
      };

      // Generate system instruction based on clinic data
      const systemInstruction = getSystemInstruction(
        this.clinicData.name,
        this.clinicData.address,
        this.clinicData.phone,
        this.clinicData.services
      );

      // Connect to Gemini Live API
      this.session = await ai.live.connect({
        model: 'gemini-2.0-flash-live-001',
        callbacks: {
          onopen: () => {
            console.log("Live Session Connected!");
            this.isConnected = true;
            this.startAudioInput();
            this.onConnect();
          },
          onmessage: (message) => this.handleMessage(message),
          onerror: (e) => {
            console.error("Live Session Error:", e);
            this.onError(e);
          },
          onclose: (e) => {
            console.log("Live Session Closed", e);
            this.isConnected = false;
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

  startAudioInput() {
    if (!this.inputAudioContext || !this.stream || !this.session) return;

    this.inputSource = this.inputAudioContext.createMediaStreamSource(this.stream);
    this.scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

    this.scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
      if (!this.isConnected || !this.session) return;

      const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
      const pcmBlob = createPcmBlob(inputData);

      try {
        this.session.sendRealtimeInput({ media: pcmBlob });
      } catch (e) {
        console.error("Error sending audio:", e);
      }
    };

    this.inputSource.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.inputAudioContext.destination);
  }

  async handleMessage(message) {
    // Handle Audio Output
    const audioPart = message.serverContent?.modelTurn?.parts?.find(p => p.inlineData?.data);
    const base64Audio = audioPart?.inlineData?.data;

    if (base64Audio && this.outputAudioContext) {
      try {
        this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);

        const audioBuffer = await decodeAudioData(
          base64ToUint8Array(base64Audio),
          this.outputAudioContext,
          24000,
          1
        );

        const source = this.outputAudioContext.createBufferSource();
        source.buffer = audioBuffer;

        const gainNode = this.outputAudioContext.createGain();
        gainNode.gain.value = 1.0;
        source.connect(gainNode);
        gainNode.connect(this.outputAudioContext.destination);

        source.addEventListener('ended', () => {
          this.sources.delete(source);
        });

        source.start(this.nextStartTime);
        this.nextStartTime += audioBuffer.duration;
        this.sources.add(source);
      } catch (e) {
        console.error("Error playing audio:", e);
      }
    }

    // Handle Tool Calls (Function Calling)
    if (message.toolCall) {
      console.log("Tool call received:", message.toolCall);
      let shouldEndSession = false;

      const functionResponses = message.toolCall.functionCalls.map(fc => {
        if (fc.name === 'bookAppointment') {
          const { date, time, service } = fc.args || {};
          console.log(`Booking: ${date} at ${time} for ${service || 'checkup'}`);

          // In production, send this to your backend
          return {
            id: fc.id,
            name: fc.name,
            response: { result: `Appointment booked for ${date} at ${time}. You will receive a confirmation shortly.` }
          };
        }

        if (fc.name === 'endSession') {
          const { reason } = fc.args || {};
          console.log(`Session ending: ${reason}`);
          shouldEndSession = true;
          return {
            id: fc.id,
            name: fc.name,
            response: { result: `Session ended: ${reason}` }
          };
        }

        return {
          id: fc.id,
          name: fc.name,
          response: { result: "Function not found" }
        };
      });

      // Send tool response back
      if (this.session) {
        try {
          this.session.sendToolResponse({ functionResponses });
        } catch (e) {
          console.error("Error sending tool response:", e);
        }
      }

      // End session after goodbye plays
      if (shouldEndSession) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('end-live-audio'));
        }, 3000);
      }
    }

    // Handle interruptions
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
    this.isConnected = false;

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

    // Close session
    if (this.session) {
      try {
        this.session.close();
      } catch (e) {}
      this.session = null;
    }
  }
}

/**
 * Send text chat message to Gemini
 */
export const sendChatMessage = async (history, newMessage, clinicData = {}) => {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                  (typeof window !== 'undefined' ? window.GEMINI_API_KEY : null);

  if (!API_KEY) {
    return "Voice assistant is not configured. Please contact the clinic directly.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
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
    return "An error occurred. Please try again or contact the clinic directly.";
  }
};
