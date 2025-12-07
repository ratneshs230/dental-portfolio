import React, { useEffect, useRef, useState } from 'react';

export const FloatingRobotHead: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show robot head when hero section is scrolled 40%
      const scrollThreshold = window.innerHeight * 0.4;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headRef.current || !eyesRef.current || !isVisible) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate percentage from center (-1 to 1)
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);

      // Head Rotation (subtle for floating head)
      const rotateY = x * 20;
      const rotateX = -y * 15;

      headRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

      // Eyes tracking
      const eyeX = x * 8;
      const eyeY = y * 8;
      eyesRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-live-audio'));
  };

  return (
    <>
      <style>{`
        @keyframes peekUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }

        @keyframes peekDown {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }

        @keyframes floatBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes blink {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }

        .floating-robot-container {
          position: fixed;
          bottom: 0;
          right: 30px;
          z-index: 1000;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .floating-robot-container:hover {
          transform: translateY(-10px);
        }

        .floating-robot-container.visible {
          animation: peekUp 0.5s ease-out forwards;
        }

        .floating-robot-container.hidden {
          animation: peekDown 0.4s ease-in forwards;
        }

        .floating-head-wrapper {
          animation: floatBob 3s ease-in-out infinite;
        }

        .floating-robot-head {
          width: 100px;
          height: 80px;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #d4d4d4 100%);
          border-radius: 35px 35px 20px 20px;
          position: relative;
          box-shadow:
            inset 5px 5px 15px rgba(255,255,255,0.9),
            inset -5px -5px 15px rgba(0,0,0,0.1),
            0 -5px 25px rgba(0,0,0,0.15),
            0 0 40px rgba(0,229,255,0.2);
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
          perspective: 1000px;
        }

        .floating-robot-head::before {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 15px;
          background: linear-gradient(to bottom, #333, #222);
          border-radius: 0 0 10px 10px;
        }

        .floating-face-screen {
          width: 70px;
          height: 42px;
          background: #111;
          border-radius: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.8);
        }

        .floating-eyes-container {
          display: flex;
          gap: 12px;
          transition: transform 0.1s ease-out;
        }

        .floating-eye {
          width: 14px;
          height: 18px;
          background: #00e5ff;
          border-radius: 50%;
          box-shadow: 0 0 12px #00e5ff;
          animation: blink 4s infinite ease-in-out;
          position: relative;
        }

        .floating-eye::after {
          content: '';
          position: absolute;
          top: 3px;
          right: 3px;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
        }

        /* Tooltip */
        .robot-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 15px;
          padding: 8px 16px;
          background: rgba(0,0,0,0.9);
          color: white;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          white-space: nowrap;
          border-radius: 20px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .robot-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: rgba(0,0,0,0.9);
        }

        .floating-robot-container:hover .robot-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-5px);
        }

        /* Mirror on head */
        .floating-mirror-stick {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 22px;
          background: #888;
        }

        .floating-mirror {
          position: absolute;
          top: -32px;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 28px;
          background: radial-gradient(circle at 30% 30%, #fff 0%, #e0e0e0 60%, #999 100%);
          border: 2px solid #aaa;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,255,255,0.8);
        }
      `}</style>

      <div
        className={`floating-robot-container ${isVisible ? 'visible' : 'hidden'}`}
        onClick={handleClick}
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        <div className="robot-tooltip">Book Appointment</div>
        <div className="floating-head-wrapper">
          <div ref={headRef} className="floating-robot-head">
            <div className="floating-mirror-stick"></div>
            <div className="floating-mirror"></div>
            <div className="floating-face-screen">
              <div ref={eyesRef} className="floating-eyes-container">
                <div className="floating-eye"></div>
                <div className="floating-eye"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
