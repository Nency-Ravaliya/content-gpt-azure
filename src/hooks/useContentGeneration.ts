import { useState } from 'react';
import { platformConfigs } from '../config/platforms';
import { generateContent } from '../services/openai';

export function useContentGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});

  const generateAllContent = async (prompt: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const results: Record<string, string> = {};
      
      for (const [platform, config] of Object.entries(platformConfigs)) {
        const content = await generateContent(prompt, config.name);
        results[platform] = content;
      }
      
      setGeneratedContent(results);
    } catch (error: any) {
      setError(error.message || 'Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearError = () => setError(null);

  return {
    isGenerating,
    error,
    generatedContent,
    generateAllContent,
    clearError
  };
}