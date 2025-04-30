import React from 'react';
import { Layout } from 'lucide-react';

export default function TemplateSelector() {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Template
      </label>
      <div className="relative">
        <select className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Select a template</option>
          <option value="promotional">Promotional Post</option>
          <option value="educational">Educational Content</option>
          <option value="announcement">Announcement</option>
          <option value="engagement">Engagement Post</option>
        </select>
        <Layout className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
    </div>
  );
}