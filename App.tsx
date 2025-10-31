
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import PromptOutput from './components/PromptOutput';
import { generatePrompt } from './services/geminiService';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePrompt = useCallback(async () => {
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const result = await generatePrompt(userInput);
      setGeneratedPrompt(result);
    } catch (e) {
      setError('Si è verificato un errore durante la generazione del prompt. Riprova.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 w-full max-w-4xl">
        <div className="space-y-12">
          <PromptInput
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onSubmit={handleGeneratePrompt}
            isLoading={isLoading}
          />

          {error && <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">{error}</div>}

          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800 rounded-xl border border-gray-700">
              <SparklesIcon className="w-12 h-12 text-purple-400 animate-pulse" />
              <p className="mt-4 text-lg font-semibold text-gray-300">Generazione del prompt in corso...</p>
              <p className="text-gray-400">L'IA sta analizzando la tua richiesta.</p>
            </div>
          )}

          {generatedPrompt && (
            <PromptOutput promptText={generatedPrompt} />
          )}
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Creato con React, Tailwind CSS e Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
