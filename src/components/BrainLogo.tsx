import React, { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';

interface BrainLogoProps {
  isExpanded: boolean;
  className?: string;
}

export function BrainLogo({ isExpanded, className }: BrainLogoProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  }, [isExpanded]);

  return (
    <div className={`relative flex items-center ${className || ''}`}>
      <div
        className={`transition-transform duration-300 ${
          isAnimating ? 'scale-110' : ''
        }`}
      >
        <Brain className={`w-8 h-8 text-[#A17A4A] transition-all duration-300 ${
          isAnimating ? 'animate-pulse' : ''
        }`} />
      </div>
      {isExpanded && (
        <h1 className="ml-2 text-lg font-black text-[#A17A4A] font-['Roboto_Slab'] transition-opacity duration-300">
          CRANIAL·IO
        </h1>
      )}
    </div>
  );
}