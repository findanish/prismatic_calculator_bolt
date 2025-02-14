import React, { useState } from 'react';
import { Sun, Moon, Brain, PanelLeftClose, PanelLeftOpen, Axe, Hammer, Scissors, Brush, Shield as Chisel } from 'lucide-react';
import { BrainLogo } from './BrainLogo';

interface SidebarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export function Sidebar({ darkMode, onToggleDarkMode, currentPage, onPageChange, isExpanded, onToggleExpanded }: SidebarProps) {
  const items = [
    { id: 'woodworking', name: 'Woodworking', icon: Axe },
    { id: 'smelting', name: 'Smelting', icon: Hammer },
    { id: 'weaving', name: 'Weaving', icon: Scissors },
    { id: 'tannery', name: 'Tannery', icon: Brush },
    { id: 'stonecutting', name: 'Stonecutting', icon: Chisel }
  ];

  return (
    <div 
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } h-screen bg-white dark:bg-black border-r border-gray-200 dark:border-zinc-900 p-4 fixed left-0 top-0 transition-all duration-300`}
    >
      <div className="relative mb-8">
        <div className={`flex items-center ${isExpanded ? 'gap-2 px-4' : 'justify-center'} py-2`}>
          <BrainLogo isExpanded={isExpanded} />
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`block w-full ${isExpanded ? 'text-left px-4' : 'text-center px-2'} py-2 rounded-lg transition-colors ${
              currentPage === item.id
                ? 'bg-[#A17A4A] text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-900'
            } flex items-center gap-3`}
            title={!isExpanded ? item.name : undefined}
          >
            <Icon size={20} className={isExpanded ? '' : 'mx-auto'} />
            {isExpanded && <span>{item.name}</span>}
          </button>
        )})}
        <div className={`${isExpanded ? 'px-4' : 'px-2'} py-2`}>
          <div
            className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-zinc-700 cursor-pointer transition-colors"
            onClick={onToggleDarkMode}
            role="button"
            tabIndex={0}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'right-1 bg-[#A17A4A]' 
                  : 'left-1 bg-[#A17A4A]'
              }`}
            />
            <Moon 
              size={12} 
              className={`absolute top-1.5 right-1.5 text-gray-500 transition-opacity duration-300 ${
                darkMode ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <Sun 
              size={12} 
              className={`absolute top-1.5 left-1.5 text-gray-500 transition-opacity duration-300 ${
                darkMode ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
        </div>
        <button
          onClick={onToggleExpanded}
          className="w-full mt-4 flex items-center justify-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-gray-700 dark:text-gray-300"
        >
          {isExpanded ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        </button>
      </div>
    </div>
  );
}