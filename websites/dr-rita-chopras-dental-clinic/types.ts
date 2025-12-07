export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

export interface LiveConnectionState {
  isConnected: boolean;
  isStreaming: boolean;
  error: string | null;
}
