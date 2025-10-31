
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
      <label htmlFor="userInput" className="block text-lg font-semibold text-gray-200 mb-2">
        1. Descrivi la tua idea o richiesta
      </label>
      <p className="text-gray-400 mb-4">
        Scrivi un'idea generale. Pensa a cosa vuoi ottenere, e l'IA strutturerà la richiesta perfetta per te.
      </p>
      <textarea
        id="userInput"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Esempio: Vorrei una ricerca geologica sulla Liguria nel periodo pre-romano."
        className="w-full h-32 p-4 bg-gray-900 border border-gray-600 rounded-lg resize-y focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors placeholder-gray-500"
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-4">
         <p className="text-gray-400 text-sm">
            Premi <kbd className="font-sans px-2 py-1.5 text-xs font-semibold text-gray-200 bg-gray-700 border border-gray-600 rounded-lg">Ctrl</kbd> + <kbd className="font-sans px-2 py-1.5 text-xs font-semibold text-gray-200 bg-gray-700 border border-gray-600 rounded-lg">Enter</kbd> per inviare
          </p>
        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          <SparklesIcon className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Generazione...' : 'Genera Prompt Avanzato'}
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
