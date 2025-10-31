
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="w-8 h-8 text-purple-400" />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Generatore di Prompt AI
          </h1>
        </div>
        <p className="text-gray-400 mt-1">
          Trasforma le tue idee in istruzioni perfette per l'IA.
        </p>
      </div>
    </header>
  );
};

export default Header;
