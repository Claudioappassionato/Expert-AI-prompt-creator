
import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface PromptOutputProps {
  promptText: string;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ promptText }) => {
  const [isCopied, setIsCopied] = useState(false);

  const finalPromptRegex = /### \*\*6\. Prompt Completo da Copiare\*\*[\s\S]*?```([\s\S]*?)```/;
  const match = promptText.match(finalPromptRegex);
  const finalPromptToCopy = match ? match[1].trim() : promptText;

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPromptToCopy);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const formattedText = promptText
    .replace(/### \*\*(.*?)\*\*/g, '<h3 class="text-xl font-bold text-purple-300 mt-6 mb-3">$1</h3>')
    .replace(/---/g, '<hr class="border-gray-700 my-6" />')
    .replace(/\* \*\*(.*?):\*\*/g, '<p class="mt-2"><strong class="font-semibold text-gray-200">$1:</strong></p>')
    .replace(/\* (.*?)\n/g, '<li class="ml-5 list-disc text-gray-300">$1</li>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 p-4 rounded-md text-gray-200 font-mono text-sm overflow-x-auto whitespace-pre-wrap mt-2">$1</pre>');


  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
            2. Prompt Generato dall'IA
        </h2>
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 flex items-center px-3 py-2 bg-gray-700 text-gray-200 text-sm font-medium rounded-md hover:bg-gray-600 transition-colors"
      >
        <ClipboardIcon className="w-4 h-4 mr-2" />
        {isCopied ? 'Copiato!' : 'Copia Prompt Finale'}
      </button>
      <div className="prose prose-invert prose-p:text-gray-300 prose-li:text-gray-300 max-w-none" dangerouslySetInnerHTML={{ __html: formattedText }} />
    </div>
  );
};

export default PromptOutput;
