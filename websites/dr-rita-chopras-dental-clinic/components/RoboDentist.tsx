import React, { useEffect, useRef } from 'react';

export const RoboDentist: React.FC = () => {
  const headRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headRef.current || !eyesRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate percentage from center (-1 to 1)
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);

      // Head Rotation (inverted Y for natural look up/down)
      const rotateY = x * 40; // Max 40 degrees left/right
      const rotateX = -y * 30; // Max 30 degrees up/down

      // Apply transform with a bit of lag/smoothing via CSS transition
      headRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

      // Eyes move slightly more to "track" intensely
      const eyeX = x * 10;
      const eyeY = y * 10;
      eyesRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-80 h-80 flex items-center justify-center select-none pointer-events-none">
      <style>{`
        @keyframes floatBody {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blink {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 15px #00e5ff; }
          50% { opacity: 0.8; box-shadow: 0 0 25px #00e5ff; }
        }
        
        .robot-perspective {
          perspective: 1000px;
        }

        .robot-head {
          width: 140px;
          height: 110px;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #d4d4d4 100%);
          border-radius: 45px;
          position: relative;
          z-index: 10;
          box-shadow: 
            inset 5px 5px 15px rgba(255,255,255,0.9),
            inset -5px -5px 15px rgba(0,0,0,0.1),
            0 15px 35px rgba(0,0,0,0.15);
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out; /* Smooth tracking */
        }

        /* The Dentist Mirror */
        .head-mirror-stick {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 30px;
          background: #888;
          z-index: 5;
        }
        .head-mirror {
          position: absolute;
          top: -45px;
          left: 50%;
          transform: translateX(-50%) rotateX(10deg);
          width: 40px;
          height: 40px;
          background: radial-gradient(circle at 30% 30%, #fff 0%, #e0e0e0 60%, #999 100%);
          border: 3px solid #silver;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
          z-index: 6;
        }
        .head-mirror::after {
           content: '';
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           width: 34px;
           height: 34px;
           border-radius: 50%;
           background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(200,200,200,0.2) 100%);
        }

        .face-screen {
          width: 100px;
          height: 60px;
          background: #111;
          border-radius: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateZ(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.8);
        }

        .eyes-container {
          display: flex;
          gap: 18px;
          transition: transform 0.1s ease-out;
        }

        .eye {
          width: 20px;
          height: 24px;
          background: #00e5ff;
          border-radius: 50%;
          box-shadow: 0 0 15px #00e5ff;
          animation: blink 4s infinite ease-in-out;
          position: relative;
        }
        .eye::after {
          content: '';
          position: absolute;
          top: 4px;
          right: 4px;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
        }

        .robot-body {
          width: 90px;
          height: 70px;
          background: linear-gradient(to bottom, #f2f2f2, #e0e0e0);
          border-radius: 40px 40px 20px 20px;
          position: relative;
          margin-top: -15px; /* Overlap with head slightly */
          z-index: 5;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
          animation: floatBody 6s ease-in-out infinite;
        }

        .robot-neck {
          width: 50px;
          height: 20px;
          background: #333;
          border-radius: 10px;
          margin: 0 auto;
          transform: translateY(10px);
          position: relative;
          z-index: 4;
        }

        /* Details */
        .badge {
          position: absolute;
          top: 25px;
          right: 20px;
          width: 8px;
          height: 8px;
          background: #ff4444;
          border-radius: 50%;
          box-shadow: 0 0 5px #ff4444;
        }
        .pocket {
           position: absolute;
           top: 20px;
           left: 20px;
           width: 25px;
           height: 3px;
           background: #ccc;
           border-radius: 2px;
        }

        .shadow-floor {
          width: 120px;
          height: 20px;
          background: black;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(8px);
          margin-top: 30px;
          animation: shadowScale 6s ease-in-out infinite;
        }
        @keyframes shadowScale {
             0%, 100% { transform: scale(1); opacity: 0.1; }
             50% { transform: scale(0.8); opacity: 0.05; }
        }

      `}</style>

      <div className="robot-perspective flex flex-col items-center">
        {/* Head Group */}
        <div ref={headRef} className="robot-head">
           <div className="head-mirror-stick"></div>
           <div className="head-mirror"></div>
           
           <div className="face-screen">
             <div ref={eyesRef} className="eyes-container">
               <div className="eye"></div>
               <div className="eye"></div>
             </div>
           </div>
        </div>

        {/* Neck & Body */}
        <div className="robot-neck"></div>
        <div className="robot-body">
           <div className="pocket"></div>
           <div className="badge"></div>
        </div>
        
        {/* Shadow */}
        <div className="shadow-floor"></div>
      </div>
    </div>
  );
};
