import React, { useState } from 'react';
import { Bold, Italic, Underline, Wand2 } from 'lucide-react';
import { platformConfigs } from '../config/platforms';
import PlatformPreview from './PlatformPreview';
import TemplateSelector from './TemplateSelector';
import ErrorMessage from './ErrorMessage';
import { generateContent } from '../services/openai';
import { useContentGeneration } from '../hooks/useContentGeneration';

export default function Editor() {
  const [prompt, setPrompt] = useState('');
  const {
    isGenerating,
    error,
    generatedContent,
    generateAllContent,
    clearError
  } = useContentGeneration();

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    generateAllContent(prompt);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Content Creator</h2>
          
          {error && (
            <ErrorMessage 
              message={error} 
              onClose={clearError}
            />
          )}
          
          <TemplateSelector />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Your Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your content idea or prompt..."
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
              <button className="p-2 hover:bg-white rounded transition-colors">
                <Bold size={20} />
              </button>
              <button className="p-2 hover:bg-white rounded transition-colors">
                <Italic size={20} />
              </button>
              <button className="p-2 hover:bg-white rounded transition-colors">
                <Underline size={20} />
              </button>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Wand2 className="mr-2" size={20} />
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(platformConfigs).map(([platform, config]) => (
          <PlatformPreview
            key={platform}
            platform={platform}
            config={config}
            content={generatedContent[platform] || ''}
          />
        ))}
      </div>
    </div>
  );
}