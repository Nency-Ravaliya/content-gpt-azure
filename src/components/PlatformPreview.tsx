import React from 'react';
import { Copy, Twitter, Linkedin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Platform, PlatformConfig } from '../types';

interface PlatformPreviewProps {
  platform: Platform;
  config: PlatformConfig;
  content: string;
}

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  whatsapp: MessageCircle,
};

export default function PlatformPreview({ platform, config, content }: PlatformPreviewProps) {
  const Icon = platformIcons[platform];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="text-gray-600" size={24} />
          <h3 className="font-semibold text-gray-800">{config.name}</h3>
        </div>
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Copy to clipboard"
        >
          <Copy size={20} />
        </button>
      </div>

      <div className="h-40 overflow-y-auto bg-gray-50 rounded-lg p-4">
        <p className="text-gray-600 whitespace-pre-wrap">
          {content || 'Generated content will appear here...'}
        </p>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{content.length} / {config.maxLength}</span>
        {config.hashtagLimit && (
          <span>{config.hashtagLimit} hashtags max</span>
        )}
      </div>
    </div>
  );
}