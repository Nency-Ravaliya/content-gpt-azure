export type Platform = 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'whatsapp';

export interface PlatformConfig {
  name: string;
  maxLength: number;
  hashtagLimit?: number;
  supportedFormats: ('bold' | 'italic' | 'underline')[];
}

export interface ContentTemplate {
  id: string;
  name: string;
  template: string;
  type: 'promotional' | 'educational';
}

export interface GeneratedContent {
  platform: Platform;
  content: string;
  hashtags: string[];
}