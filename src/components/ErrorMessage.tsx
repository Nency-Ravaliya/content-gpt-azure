import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <div className="flex items-center">
        <AlertCircle className="text-red-400 mr-2" size={20} />
        <div className="flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-500"
        >
          ×
        </button>
      </div>
    </div>
  );
}