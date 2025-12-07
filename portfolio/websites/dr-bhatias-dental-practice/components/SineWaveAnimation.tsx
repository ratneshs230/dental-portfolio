import React, { useEffect, useRef, useState } from 'react';

interface SineWaveAnimationProps {
  isHovered: boolean;
}

export const SineWaveAnimation: React.FC<SineWaveAnimationProps> = ({ isHovered }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const animationRef = useRef<number>(0);
  const voiceIntensityRef = useRef(0); // 0 = inactive, 1 = active
  const hoverIntensityRef = useRef(0); // 0 = not hovered, 1 = hovered

  // Listen for voice session changes
  useEffect(() => {
    const handleVoiceChange = (e: CustomEvent) => {
      setIsVoiceActive(e.detail.active);
    };
    window.addEventListener('voice-session-change', handleVoiceChange as EventListener);
    return () => window.removeEventListener('voice-session-change', handleVoiceChange as EventListener);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    // Gradient colors - calm state
    const gradientColors = [
      { start: '#00e5ff', end: '#0088ff' },
      { start: '#00ffcc', end: '#00e5ff' },
      { start: '#88ffff', end: '#00ccff' },
      { start: '#00ffaa', end: '#00e5ff' },
    ];

    // Active state colors - more vibrant
    const activeGradientColors = [
      { start: '#ff00ff', end: '#00e5ff' },
      { start: '#00e5ff', end: '#ff6600' },
      { start: '#ffff00', end: '#00ff88' },
      { start: '#ff0088', end: '#8800ff' },
    ];

    // Helper to interpolate between two values
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Helper to interpolate colors
    const lerpColor = (color1: string, color2: string, t: number) => {
      const c1 = hexToRgb(color1);
      const c2 = hexToRgb(color2);
      if (!c1 || !c2) return color1;
      const r = Math.round(lerp(c1.r, c2.r, t));
      const g = Math.round(lerp(c1.g, c2.g, t));
      const b = Math.round(lerp(c1.b, c2.b, t));
      return `rgb(${r}, ${g}, ${b})`;
    };

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerY = height / 2;

      // Smooth transition towards target states
      const targetVoiceIntensity = isVoiceActive ? 1 : 0;
      voiceIntensityRef.current += (targetVoiceIntensity - voiceIntensityRef.current) * 0.04;

      const targetHoverIntensity = isHovered ? 1 : 0;
      hoverIntensityRef.current += (targetHoverIntensity - hoverIntensityRef.current) * 0.06;

      const voiceIntensity = voiceIntensityRef.current;
      const hoverIntensity = hoverIntensityRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Wave parameters - affected by hover and voice
      const baseWaveCount = 4;
      const waveCount = baseWaveCount + Math.floor(voiceIntensity * 3);
      const baseSpeed = 0.025;
      const speed = baseSpeed + hoverIntensity * 0.015 + voiceIntensity * 0.05;
      const baseAmplitude = 6;
      const amplitude = baseAmplitude + hoverIntensity * 4 + voiceIntensity * 10;

      time += speed;

      // Blend colors based on voice intensity
      const colors = voiceIntensity > 0.5 ? activeGradientColors : gradientColors;

      // Number of points to draw
      const pointCount = 80;

      // Define start and end points for linear waves
      const startPadding = width * 0.1; // 10% padding from left
      const endPadding = width * 0.1;   // 10% padding from right
      const waveWidth = width - startPadding - endPadding;

      for (let w = 0; w < waveCount; w++) {
        const waveOffset = (w / waveCount) * Math.PI * 2;
        const wavePhase = time + waveOffset;
        const colorIndex = w % colors.length;
        const alpha = 0.5 + (1 - w / waveCount) * 0.4 + voiceIntensity * 0.1;

        // Calculate all points for the wave
        const points: { x: number; y: number }[] = [];

        for (let i = 0; i <= pointCount; i++) {
          const t = i / pointCount;

          // Envelope function - tapers at both ends (0 at edges, 1 in middle)
          const envelope = Math.sin(t * Math.PI); // smooth bell curve
          const taperEnvelope = Math.pow(envelope, 0.5); // less aggressive taper

          // Linear wave position with start/end points
          const x = startPadding + t * waveWidth;
          const frequency = 0.025 + w * 0.008;
          const waveAmplitude = amplitude * (0.6 + w * 0.12) * taperEnvelope;
          const y = centerY + Math.sin(x * frequency + wavePhase) * waveAmplitude;

          points.push({ x, y });
        }

        // Draw the wave line
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 2 + voiceIntensity + hoverIntensity * 0.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Create gradient along the path - from start to end point
        const gradient = ctx.createLinearGradient(startPadding, centerY, startPadding + waveWidth, centerY);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.1, colors[colorIndex].start);
        gradient.addColorStop(0.5, colors[(colorIndex + 1) % colors.length].end);
        gradient.addColorStop(0.9, colors[colorIndex].end);
        gradient.addColorStop(1, 'transparent');
        ctx.strokeStyle = gradient;

        ctx.beginPath();
        points.forEach((point, idx) => {
          if (idx === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();

        // Draw start and end point markers (small glowing dots)
        const markerAlpha = alpha * 0.8;
        ctx.globalAlpha = markerAlpha;

        // Start point
        const startGradient = ctx.createRadialGradient(
          points[0].x, points[0].y, 0,
          points[0].x, points[0].y, 4 + hoverIntensity * 2
        );
        startGradient.addColorStop(0, colors[colorIndex].start);
        startGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = startGradient;
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, 4 + hoverIntensity * 2, 0, Math.PI * 2);
        ctx.fill();

        // End point
        const endGradient = ctx.createRadialGradient(
          points[points.length - 1].x, points[points.length - 1].y, 0,
          points[points.length - 1].x, points[points.length - 1].y, 4 + hoverIntensity * 2
        );
        endGradient.addColorStop(0, colors[colorIndex].end);
        endGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = endGradient;
        ctx.beginPath();
        ctx.arc(points[points.length - 1].x, points[points.length - 1].y, 4 + hoverIntensity * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      }

      // Add subtle glow effect when voice is active
      if (voiceIntensity > 0.1) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        const glowGradient = ctx.createLinearGradient(startPadding, centerY, startPadding + waveWidth, centerY);
        glowGradient.addColorStop(0, 'transparent');
        glowGradient.addColorStop(0.3, `rgba(0, 229, 255, ${0.1 * voiceIntensity})`);
        glowGradient.addColorStop(0.5, `rgba(136, 255, 255, ${0.15 * voiceIntensity})`);
        glowGradient.addColorStop(0.7, `rgba(0, 229, 255, ${0.1 * voiceIntensity})`);
        glowGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = glowGradient;
        ctx.fillRect(startPadding, centerY - 20, waveWidth, 40);
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered, isVoiceActive]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-20 pointer-events-none"
      style={{
        opacity: 0.9,
        mixBlendMode: 'normal'
      }}
    />
  );
};
