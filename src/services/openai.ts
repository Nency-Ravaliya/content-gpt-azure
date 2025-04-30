import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
const apiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
const deploymentName = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT;

if (!endpoint || !apiKey || !deploymentName) {
  throw new Error('Missing Azure OpenAI configuration. Please check your .env file.');
}

const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

export const generateContent = async (prompt: string, platform: string): Promise<string> => {
  try {
    const response = await client.getChatCompletions(
      deploymentName,
      [
        {
          role: 'system',
          content: `You are a direct content generator for ${platform}. Generate only the content without any introductions, explanations, or phrases like "here is" or "below is". The content must be appropriate for ${platform}'s style and format.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      {
        temperature: 0.7,
        max_tokens: 500,
      }
    );

    const content = response.choices[0]?.message?.content?.trim() || '';
    // Remove common prefixes like "Here's", "Here is", etc.
    return content.replace(/^(here'?s?|below|feel free|i would suggest)[^]*?:/i, '').trim();
  } catch (error: any) {
    console.error('Error generating content:', error);
    throw new Error(error.message || 'Failed to generate content');
  }
};