import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { WoodworkingCalculator } from './components/WoodworkingCalculator';
import { SmeltingCalculator } from './components/SmeltingCalculator';
import { LoomCalculator } from './components/LoomCalculator';
import { TanneryCalculator } from './components/TanneryCalculator';
import { StonecuttingCalculator } from './components/StonecuttingCalculator';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('woodworking');

  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black font-['Roboto_Slab']">
      <Sidebar 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isExpanded={isExpanded}
        onToggleExpanded={() => setIsExpanded(!isExpanded)}
      />
      <div className={`${isExpanded ? 'pl-64' : 'pl-20'} transition-all duration-300`}>
        <main className="container mx-auto py-8 px-4">
          {currentPage === 'woodworking' && <WoodworkingCalculator />}
          {currentPage === 'smelting' && <SmeltingCalculator />}
          {currentPage === 'weaving' && <LoomCalculator />}
          {currentPage === 'tannery' && <TanneryCalculator />}
          {currentPage === 'stonecutting' && <StonecuttingCalculator />}
        </main>
      </div>
    </div>
  );
}

export default App;