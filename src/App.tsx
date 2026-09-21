import React, { useState, useEffect } from 'react';
import { ServerConfig } from './types';
import { DEFAULT_CONFIG } from './config/defaultConfig';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewEraCommunitySection } from './components/NewEraCommunitySection';
import { ClassifiedMysterySection } from './components/ClassifiedMysterySection';
import { FarewellMemorialSection } from './components/FarewellMemorialSection';
import { ServerRulesSection } from './components/ServerRulesSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { InaugurationCeremony } from './components/InaugurationCeremony';

const LOCAL_STORAGE_KEY = 'discord_server_config_new_era_v1';

export default function App() {
  const [config, setConfig] = useState<ServerConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch (err) {
      console.warn('Failed to parse saved config from localStorage:', err);
    }
    return DEFAULT_CONFIG;
  });

  // Check if this is the user's first time entering to show the scissors and ribbon inauguration ceremony
  const [showInauguration, setShowInauguration] = useState<boolean>(() => {
    try {
      const alreadyInaugurated = localStorage.getItem('los_daddys_ribbon_inaugurated_v1');
      return alreadyInaugurated !== 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    } catch (err) {
      console.warn('Failed to save config to localStorage:', err);
    }
  }, [config]);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* First-time Ribbon Cutting Ceremony Modal (Scissors & Line / Ribbon) */}
      <InaugurationCeremony
        isOpen={showInauguration}
        onComplete={() => setShowInauguration(false)}
      />

      {/* Sticky Navbar for the New Era */}
      <Navbar
        config={config}
        onReopenCeremony={() => setShowInauguration(true)}
      />

      {/* Main Content Sections: 100% Welcome to the New Era, No Coins or Casino */}
      <main className="flex-1">
        {/* Welcome Hero */}
        <Hero config={config} />

        {/* The New Era: Voice Channels, Gaming, Streams & Community */}
        <NewEraCommunitySection config={config} />

        {/* Coming Soon: High-Tension Classified Mystery & Complex Interactive Clues */}
        <ClassifiedMysterySection />

        {/* Nostalgic Farewell to Casino & Virtual Coins */}
        <FarewellMemorialSection />

        {/* Official Rules of Respect & Coexistence */}
        <ServerRulesSection config={config} />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onReopenCeremony={() => setShowInauguration(true)}
      />

    </div>
  );
}
