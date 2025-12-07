import { GoogleGenAI, LiveServerMessage, Modality, FunctionDeclaration, Type } from "@google/genai";
import { ChatMessage, ChatRole } from "../types";
import { createPcmBlob, decodeAudioData, base64ToUint8Array } from "./audioUtils";
import { SYSTEM_INSTRUCTION, ASSISTANT_CONFIG, TOOL_DESCRIPTIONS } from "./livePrompt";

const API_KEY = process.env.API_KEY || '';

// Singleton instance management if needed, but for React we'll instantiate per session/chat usually
// to avoid stale states, though the client is stateless.
const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Tool declarations - built from livePrompt.ts configuration
 */
const bookAppointmentTool: FunctionDeclaration = {
  name: TOOL_DESCRIPTIONS.bookAppointment.name,
  description: TOOL_DESCRIPTIONS.bookAppointment.description,
  parameters: {
    type: Type.OBJECT,
    properties: {
      date: { type: Type.STRING, description: TOOL_DESCRIPTIONS.bookAppointment.parameters.date },
      time: { type: Type.STRING, description: TOOL_DESCRIPTIONS.bookAppointment.parameters.time },
      service: { type: Type.STRING, description: TOOL_DESCRIPTIONS.bookAppointment.parameters.service }
    },
    required: TOOL_DESCRIPTIONS.bookAppointment.required
  }
};

const endSessionTool: FunctionDeclaration = {
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

export const sendChatMessage = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: "You are the AI assistant for Dr. Ashok Mittal's Dental Clinic, a premium dental clinic. You are professional, concise, and helpful. You help users with booking, service information, and dental care advice.",
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I apologize, I could not generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "An error occurred while communicating with the AI.";
  }
};

/**
 * Manages the Live API Session (WebSocket)
 */
export class LiveSessionManager {
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private nextStartTime = 0;
  private sources = new Set<AudioBufferSourceNode>();
  private sessionPromise: Promise<any> | null = null;
  private stream: MediaStream | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private inputSource: MediaStreamAudioSourceNode | null = null;
  
  // Callbacks
  onConnect: () => void = () => {};
  onDisconnect: () => void = () => {};
  onError: (err: any) => void = () => {};

  constructor() {}

  async connect() {
    if (!API_KEY) {
      this.onError(new Error("API Key missing"));
      return;
    }

    try {
      this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log("Live Session Opened");
            this.startAudioInput();
            this.onConnect();
          },
          onmessage: (message: LiveServerMessage) => this.handleMessage(message),
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
            voiceConfig: { prebuiltVoiceConfig: { voiceName: ASSISTANT_CONFIG.voiceName } }
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });
    } catch (err) {
      this.onError(err);
    }
  }

  private startAudioInput() {
    if (!this.inputAudioContext || !this.stream || !this.sessionPromise) return;

    this.inputSource = this.inputAudioContext.createMediaStreamSource(this.stream);
    this.scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

    this.scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
      const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
      const pcmBlob = createPcmBlob(inputData);
      
      this.sessionPromise?.then((session: any) => {
        session.sendRealtimeInput({ media: pcmBlob });
      });
    };

    this.inputSource.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.inputAudioContext.destination);
  }

  private async handleMessage(message: LiveServerMessage) {
    // Handle Audio Output
    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio && this.outputAudioContext) {
      // Ensure time monotonicity
      this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
      
      const audioBuffer = await decodeAudioData(
        base64ToUint8Array(base64Audio),
        this.outputAudioContext,
        24000,
        1
      );

      const source = this.outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      
      // Basic gain node for volume control if needed
      const gainNode = this.outputAudioContext.createGain();
      source.connect(gainNode);
      gainNode.connect(this.outputAudioContext.destination);

      source.addEventListener('ended', () => {
        this.sources.delete(source);
      });

      source.start(this.nextStartTime);
      this.nextStartTime += audioBuffer.duration;
      this.sources.add(source);
    }

    // Handle Tool Calls (Function Calling)
    if (message.toolCall) {
      console.log("Received tool call:", message.toolCall);
      let shouldEndSession = false;

      const functionResponses = message.toolCall.functionCalls.map(fc => {
        if (fc.name === 'bookAppointment') {
           const { date, time, service } = fc.args as any;
           // In a real app, this would interact with a backend database
           console.log(`Booking confirmed: ${date} at ${time} for ${service || 'checkup'}`);
           return {
             id: fc.id,
             name: fc.name,
             response: { result: `Success. Appointment booked for ${date} at ${time}.` }
           };
        }
        if (fc.name === 'endSession') {
           const { reason } = fc.args as any;
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
      this.sessionPromise?.then((session: any) => {
        session.sendToolResponse({
          functionResponses: functionResponses
        });
      });

      // If AI wants to end the session, trigger disconnect after a brief delay
      // to allow the farewell audio to play
      if (shouldEndSession) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('end-live-audio'));
        }, 2000); // 2 second delay to let goodbye message play
      }
    }

    if (message.serverContent?.interrupted) {
      this.stopPlayback();
    }
  }

  private stopPlayback() {
    this.sources.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    this.sources.clear();
    this.nextStartTime = 0;
  }

  async disconnect() {
    // Stop input
    if (this.scriptProcessor && this.inputSource) {
      this.inputSource.disconnect();
      this.scriptProcessor.disconnect();
    }
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
    }
    if (this.inputAudioContext) {
      await this.inputAudioContext.close();
    }

    // Stop output
    this.stopPlayback();
    if (this.outputAudioContext) {
      await this.outputAudioContext.close();
    }
    
    // Close session if possible (wrapper doesn't expose explicit close on promise easily without storing session obj, 
    // but stopping streams effectively kills the interaction flow)
    // Ideally we would call session.close() if we had the resolved session object stored.
    // Re-instantiating the manager for a new session is cleaner in this demo.
  }
}