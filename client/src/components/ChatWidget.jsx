import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Minus, RotateCcw, Send, Sparkles, AlertCircle, Dumbbell, ArrowUpRight } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { sendChatMessage } from '../services/aiService';
import { gymConfig } from '../data/gymConfig';

export default function ChatWidget({ isOpen, onToggle, onOpenAiAgent }) {
  const [messages, setMessages] = useState(() => {
    // Session history persistence
    const saved = sessionStorage.getItem('vyrox_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed parsing stored chat history');
      }
    }
    return [
      {
        id: 'welcome-1',
        role: 'assistant',
        content: `Welcome to **VYROX ATHLETICS**. I'm your dedicated AI Fitness & Member Advisor.\n\nAsk me about our **24/7 facility**, membership options, workout tracks, or ask for athletic advice. How can I help you train with purpose today?`,
        timestamp: new Date().toISOString(),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('vyrox_chat_history', JSON.stringify(messages));
    } catch (e) {
      // Ignore quota errors
    }
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  const quickPrompts = [
    'Which membership is right for me?',
    'I want to lose weight.',
    'Help me build muscle.',
    'What are your gym timings?',
    'How do I contact the gym?',
  ];

  const handleSend = async (messageText = input) => {
    const trimmed = (messageText || '').trim();
    if (!trimmed || loading) return;

    setError(null);
    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Build lightweight conversation history for the backend
      const historyPayload = messages.slice(-8).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await sendChatMessage(trimmed, historyPayload, {
        page: window.location.hash || 'home',
      });

      const assistantMsg = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        provider: response.provider,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setError({
        message: err.message || 'Unable to connect to AI server. Please check your connection or retry.',
        lastMessage: trimmed,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (error && error.lastMessage) {
      const msg = error.lastMessage;
      setError(null);
      handleSend(msg);
    }
  };

  const handleResetChat = () => {
    const initial = [
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Chat session reset. What would you like to know about **VYROX ATHLETICS**?`,
        timestamp: new Date().toISOString(),
      },
    ];
    setMessages(initial);
    sessionStorage.removeItem('vyrox_chat_history');
    setError(null);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-br from-vyrox-red to-vyrox-darkred text-white shadow-crimson hover:shadow-crimson-lg transition-all duration-300 transform hover:scale-105 active:scale-95 group flex items-center gap-3 border border-vyrox-red/50"
          aria-label="Open AI Fitness Chat"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 transform group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-vyrox-950 animate-pulse" />
          </div>
          <span className="hidden sm:inline font-athletic text-sm font-bold uppercase tracking-wider pr-1">
            AI Fitness Chat
          </span>
        </button>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] rounded-3xl bg-vyrox-950/95 border-2 border-vyrox-red/80 shadow-2xl backdrop-blur-xl flex flex-col transition-all duration-300 overflow-hidden ${
            isMinimized ? 'h-16' : 'h-[620px] max-h-[88vh]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-vyrox-900 via-vyrox-850 to-vyrox-900 border-b border-vyrox-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-vyrox-red/20 border border-vyrox-red/50 flex items-center justify-center text-vyrox-crimson shadow-crimson-sm">
                <Dumbbell className="w-4 h-4 transform -rotate-45" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-athletic text-lg font-bold text-white tracking-wide uppercase">
                    VYROX AI ADVISOR
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  24/7 Facility & Workout Intelligence
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-vyrox-800 transition-colors"
                title="Reset chat conversation"
                aria-label="Reset chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-vyrox-800 transition-colors"
                title={isMinimized ? 'Expand chat' : 'Minimize chat'}
                aria-label="Minimize chat"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg text-gray-400 hover:text-vyrox-crimson hover:bg-vyrox-800 transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Content Area */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}

                {/* Typing Indicator */}
                {loading && (
                  <div className="flex gap-3 mb-4 items-center animate-fadeIn">
                    <div className="w-8 h-8 rounded-xl bg-vyrox-850 border border-vyrox-700 flex items-center justify-center text-vyrox-crimson">
                      <Sparkles className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="rounded-2xl p-3 bg-vyrox-900 border border-vyrox-800 flex items-center gap-1.5 text-xs text-gray-400">
                      <span>VYROX AI is thinking</span>
                      <span className="flex gap-1 ml-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-vyrox-crimson animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-vyrox-crimson animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-vyrox-crimson animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                )}

                {/* Error Banner with Retry */}
                {error && (
                  <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-xs text-red-200 flex items-start justify-between gap-2 animate-fadeIn my-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{error.message}</span>
                    </div>
                    <button
                      onClick={handleRetry}
                      className="px-2 py-1 bg-red-800 hover:bg-red-700 rounded text-[11px] font-bold text-white shrink-0 uppercase tracking-wider"
                    >
                      Retry
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Carousel */}
              <div className="px-4 py-2 border-t border-vyrox-900 bg-vyrox-900/40">
                <p className="text-[10px] uppercase tracking-wider text-vyrox-muted font-bold mb-1.5">
                  Suggested Questions:
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      disabled={loading}
                      className="px-3 py-1 rounded-full bg-vyrox-850 hover:bg-vyrox-800 border border-vyrox-700/80 text-[11px] text-gray-300 hover:text-white whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dedicated Fitness Agent Quick Link Banner */}
              <div className="px-4 py-1.5 bg-gradient-to-r from-vyrox-900 via-vyrox-850 to-vyrox-900 border-t border-vyrox-850 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-400">Want a structured 7-day workout plan?</span>
                <button
                  onClick={() => {
                    onToggle();
                    if (onOpenAiAgent) onOpenAiAgent();
                  }}
                  className="text-[11px] font-bold text-vyrox-crimson hover:underline flex items-center gap-1"
                >
                  <span>Open Fitness Agent</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              {/* Chat Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 bg-vyrox-900 border-t border-vyrox-800 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about training, memberships, hours..."
                  maxLength={1000}
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-vyrox-850 border border-vyrox-700/80 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-vyrox-red focus:ring-1 focus:ring-vyrox-red transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-2.5 rounded-xl bg-vyrox-red hover:bg-vyrox-darkred disabled:bg-vyrox-800 text-white shadow-crimson-sm transition-all focus:outline-none focus:ring-2 focus:ring-vyrox-red disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

