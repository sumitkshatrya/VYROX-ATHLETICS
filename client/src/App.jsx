import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import FitnessAgent from './components/FitnessAgent';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [agentInitialGoal, setAgentInitialGoal] = useState('');

  const handleOpenAiAgent = (initialGoal = '') => {
    setAgentInitialGoal(initialGoal);
    setIsAgentOpen(true);
  };

  const handleCloseAiAgent = () => {
    setIsAgentOpen(false);
    setAgentInitialGoal('');
  };

  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-vyrox-950 text-vyrox-silver selection:bg-vyrox-red selection:text-white flex flex-col font-sans">
      {/* Fixed Sticky Header Navigation */}
      <Navbar
        onOpenAiAgent={() => handleOpenAiAgent()}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Home Page with all Gym Sections */}
      <div className="flex-1">
        <Home
          onOpenAiAgent={() => handleOpenAiAgent()}
          onSelectProgramForAgent={(programTitle) => handleOpenAiAgent(programTitle)}
        />
      </div>

      {/* Footer */}
      <Footer onOpenAiAgent={() => handleOpenAiAgent()} />

      {/* Floating AI Chatbot Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onToggle={handleToggleChat}
        onOpenAiAgent={() => handleOpenAiAgent()}
      />

      {/* Dedicated Guided AI Fitness Agent Modal */}
      <FitnessAgent
        isOpen={isAgentOpen}
        onClose={handleCloseAiAgent}
        initialGoal={agentInitialGoal}
      />
    </div>
  );
}

