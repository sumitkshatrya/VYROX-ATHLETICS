import React from 'react';
import { Dumbbell, User, Sparkles } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isAssistant = message.role === 'assistant';

  // Format simple markdown (bold, lists, code) into readable styled spans
  const formatText = (text) => {
    if (!text) return '';

    // Split paragraphs
    const paragraphs = text.split('\n');

    return paragraphs.map((paragraph, pIdx) => {
      if (!paragraph.trim()) {
        return <div key={pIdx} className="h-2" />;
      }

      // Check bullet point
      const isBullet = paragraph.trim().startsWith('•') || paragraph.trim().startsWith('*') || paragraph.trim().startsWith('-');
      const cleanPara = isBullet ? paragraph.replace(/^(\s*[-•*]\s*)/, '') : paragraph;

      // Handle bold text (**bold**)
      const parts = cleanPara.split(/(\*\*.*?\*\*)/g);

      const renderedParts = parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={idx} className="font-bold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={pIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-vyrox-crimson font-bold text-sm leading-tight">&bull;</span>
            <span className="text-xs sm:text-sm text-gray-200 leading-relaxed">{renderedParts}</span>
          </div>
        );
      }

      return (
        <p key={pIdx} className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-1.5 last:mb-0">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <div className={`flex gap-3 mb-4 animate-fadeIn ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      {/* Assistant Avatar */}
      {isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-vyrox-red to-vyrox-darkred flex items-center justify-center shrink-0 shadow-crimson-sm border border-vyrox-red/40 mt-1">
          <Dumbbell className="w-4 h-4 text-white transform -rotate-45" />
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`max-w-[85%] rounded-2xl p-4 shadow-md ${
          isAssistant
            ? 'bg-vyrox-900 border border-vyrox-800 text-gray-200'
            : 'bg-vyrox-red text-white border border-vyrox-red/80 ml-auto'
        }`}
      >
        <div className="flex items-center justify-between gap-4 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-vyrox-muted">
            {isAssistant ? 'VYROX AI Coach' : 'You'}
          </span>
          {message.timestamp && (
            <span className="text-[9px] text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        <div className="text-sm">
          {formatText(message.content)}
        </div>
      </div>

      {/* User Avatar */}
      {!isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-vyrox-800 flex items-center justify-center shrink-0 border border-vyrox-700 mt-1">
          <User className="w-4 h-4 text-gray-300" />
        </div>
      )}
    </div>
  );
}

