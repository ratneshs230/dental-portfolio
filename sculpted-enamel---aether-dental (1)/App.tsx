import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { ChatWidget } from './components/ChatWidget';
import { LiveAudioWidget } from './components/LiveAudioWidget';
import { CursorFollower } from './components/CursorFollower';
import { FloatingRobotHead } from './components/FloatingRobotHead';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white cursor-auto">
      <CursorFollower />
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <ReviewsSection />
        <ContactSection />
      </main>

      {/* AI Integration Components */}
      <ChatWidget />
      <LiveAudioWidget />
      <FloatingRobotHead />
    </div>
  );
};

export default App;
