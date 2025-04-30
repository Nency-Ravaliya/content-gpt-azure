import { PlatformConfig } from '../types';

export const platformConfigs: Record<string, PlatformConfig> = {
  twitter: {
    name: 'Twitter',
    maxLength: 280,
    hashtagLimit: 3,
    supportedFormats: ['bold', 'italic'],
  },
  linkedin: {
    name: 'LinkedIn',
    maxLength: 3000,
    hashtagLimit: 5,
    supportedFormats: ['bold', 'italic', 'underline'],
  },
  facebook: {
    name: 'Facebook',
    maxLength: 63206,
    hashtagLimit: 30,
    supportedFormats: ['bold', 'italic', 'underline'],
  },
  instagram: {
    name: 'Instagram',
    maxLength: 2200,
    hashtagLimit: 30,
    supportedFormats: ['bold', 'italic'],
  },
  whatsapp: {
    name: 'WhatsApp',
    maxLength: 65536,
    supportedFormats: ['bold', 'italic', 'underline'],
  },
};