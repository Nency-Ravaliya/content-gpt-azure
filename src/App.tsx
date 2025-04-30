import React from 'react';
import Editor from './components/Editor';
import { Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-blue-600" size={24} />
            <h1 className="text-xl font-bold text-gray-800">ContentGPT</h1>
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <Editor />
      </main>
    </div>
  );
}

export default App;