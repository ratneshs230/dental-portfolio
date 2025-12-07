import React, { useState, useEffect } from 'react';
import { MenuIcon } from './Icons';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-medium tracking-wide uppercase">
          Dr. Neha Singh's Dental Clinic
        </div>

        <nav className="flex items-center gap-8 md:gap-12">
          <a href="#services" className="hidden md:block text-sm uppercase tracking-widest hover:opacity-60 transition">Services</a>
          <a href="#reviews" className="hidden md:block text-sm uppercase tracking-widest hover:opacity-60 transition">Reviews</a>
          <a href="#contact" className="hidden md:block text-sm uppercase tracking-widest hover:opacity-60 transition">Contact</a>
          <button className="hover:opacity-60 transition">
            <MenuIcon />
          </button>
        </nav>
      </div>
    </header>
  );
};