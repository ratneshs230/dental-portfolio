import React, { useEffect, useRef, useState } from 'react';

export const CursorFollower: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Initialize position on first move to prevent "flying in" from 0,0
      if (!isVisible) {
        positionRef.current = { x: e.clientX, y: e.clientY };
        setIsVisible(true);
      }
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [isVisible]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const { x: targetX, y: targetY } = mouseRef.current;
      const { x: currentX, y: currentY } = positionRef.current;

      // Linear interpolation (lerp) for smooth trailing effect
      // 0.15 controls the speed/lag. Lower is slower/smoother.
      const strength = 0.15; 
      const newX = currentX + (targetX - currentX) * strength;
      const newY = currentY + (targetY - currentY) * strength;

      positionRef.current = { x: newX, y: newY };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[100] hidden md:block transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'transform' }}
    >
      {/* Outer Ring */}
      <div className="w-12 h-12 border border-gray-800/30 rounded-full bg-white/5 backdrop-blur-[1px]" />
      
      {/* Optional: Inner Dot center point (optional, uncomment if desired) */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-black rounded-full" /> */}
    </div>
  );
};