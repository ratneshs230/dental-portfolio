import React, { useState, useEffect, useRef } from 'react';
import { LiveSessionManager } from '../services/geminiService';

export const LiveAudioWidget: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const sessionManager = useRef<LiveSessionManager | null>(null);

  const startSession = async () => {
    if (status === 'connecting' || status === 'connected') return;

    setStatus('connecting');
    sessionManager.current = new LiveSessionManager();

    sessionManager.current.onConnect = () => {
      setStatus('connected');
      window.dispatchEvent(new CustomEvent('voice-session-change', { detail: { active: true } }));
    };

    sessionManager.current.onDisconnect = () => {
      setStatus('idle');
      window.dispatchEvent(new CustomEvent('voice-session-change', { detail: { active: false } }));
    };

    sessionManager.current.onError = (e) => {
      console.error(e);
      setStatus('error');
      window.dispatchEvent(new CustomEvent('voice-session-change', { detail: { active: false } }));
    };

    await sessionManager.current.connect();
  };

  const endSession = async () => {
    if (sessionManager.current) {
      await sessionManager.current.disconnect();
      sessionManager.current = null;
    }
    setStatus('idle');
    window.dispatchEvent(new CustomEvent('voice-session-change', { detail: { active: false } }));
  };

  // Listen for custom open event
  useEffect(() => {
    const handleOpen = () => startSession();
    window.addEventListener('open-live-audio', handleOpen);
    return () => window.removeEventListener('open-live-audio', handleOpen);
  }, [status]);

  // Listen for custom end event
  useEffect(() => {
    const handleEnd = () => endSession();
    window.addEventListener('end-live-audio', handleEnd);
    return () => window.removeEventListener('end-live-audio', handleEnd);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionManager.current) {
        sessionManager.current.disconnect();
      }
    };
  }, []);

  // No popup UI - the Hero component handles the visual state
  return null;
};
