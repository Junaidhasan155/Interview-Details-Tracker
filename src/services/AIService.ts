// AI Services integration for Interview Tracker
import { pipeline, env } from '@huggingface/transformers';
import FirecrawlApp from '@mendable/firecrawl-js';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface FirecrawlResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface ElevenLabsResponse {
  audio_base64?: string;
  error?: string;
}

export class AIService {
  private static API_KEYS_STORAGE = {
    perplexity: 'ai_perplexity_key',
    elevenlabs: 'ai_elevenlabs_key',
    firecrawl: 'ai_firecrawl_key',
  };

  // API Key Management
  static saveApiKey(service: keyof typeof this.API_KEYS_STORAGE, apiKey: string): void {
    localStorage.setItem(this.API_KEYS_STORAGE[service], apiKey);
  }

  static getApiKey(service: keyof typeof this.API_KEYS_STORAGE): string | null {
    return localStorage.getItem(this.API_KEYS_STORAGE[service]);
  }

  static hasApiKey(service: keyof typeof this.API_KEYS_STORAGE): boolean {
    return !!this.getApiKey(service);
  }

  // 1. AI Study Assistant with Perplexity
  static async askStudyQuestion(question: string, context?: string): Promise<string> {
    const apiKey = this.getApiKey('perplexity');
    if (!apiKey) throw new Error('Perplexity API key not found');

    const contextPrompt = context 
      ? `Context: ${context}\n\nQuestion: ${question}`
      : question;

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful study assistant for interview preparation. Provide clear, concise, and actionable answers. Focus on practical advice and examples.'
            },
            {
              role: 'user',
              content: contextPrompt
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'month',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.statusText}`);
      }

      const data: PerplexityResponse = await response.json();
      return data.choices[0]?.message?.content || 'No response received';
    } catch (error) {
      console.error('Error with Perplexity API:', error);
      throw error;
    }
  }

  // 2. Text-to-Speech with ElevenLabs
  static async textToSpeech(text: string, voiceId: string = '9BWtsMINqrJLrRacOk9x'): Promise<string> {
    const apiKey = this.getApiKey('elevenlabs');
    if (!apiKey) throw new Error('ElevenLabs API key not found');

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Error with ElevenLabs API:', error);
      throw error;
    }
  }

  // 3. Smart URL Content Extraction with Firecrawl
  static async extractUrlContent(url: string): Promise<{ content: string; title: string; description: string }> {
    const apiKey = this.getApiKey('firecrawl');
    if (!apiKey) throw new Error('Firecrawl API key not found');

    try {
      const app = new FirecrawlApp({ apiKey });
      const result = await app.scrapeUrl(url, {
        formats: ['markdown', 'html']
      });

      if (result.success && result.markdown) {
        return {
          content: result.markdown || result.html || 'No content extracted',
          title: result.metadata?.title || 'Untitled',
          description: result.metadata?.description || 'No description'
        };
      } else {
        throw new Error('Failed to extract content');
      }
    } catch (error) {
      console.error('Error with Firecrawl API:', error);
      throw error;
    }
  }

  // 4. In-browser Background Removal (Free!)
  static async removeBackground(imageFile: File): Promise<Blob> {
    try {
      const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
        device: 'webgpu',
      });
      
      // Convert file to image element
      const imageUrl = URL.createObjectURL(imageFile);
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Create canvas and draw image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = Math.min(img.width, 1024);
      canvas.height = Math.min(img.height, 1024);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get image data
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      
      // Process with segmentation model
      const result = await segmenter(imageData);
      
      if (!result || !Array.isArray(result) || result.length === 0) {
        throw new Error('Invalid segmentation result');
      }

      // Apply mask to create transparent background
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = canvas.width;
      outputCanvas.height = canvas.height;
      const outputCtx = outputCanvas.getContext('2d')!;
      
      outputCtx.drawImage(canvas, 0, 0);
      const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
      const data = outputImageData.data;
      
      // Apply inverted mask to alpha channel
      for (let i = 0; i < result[0].mask.data.length; i++) {
        const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
        data[i * 4 + 3] = alpha;
      }
      
      outputCtx.putImageData(outputImageData, 0, 0);
      
      // Convert to blob
      return new Promise((resolve, reject) => {
        outputCanvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        }, 'image/png', 1.0);
      });
    } catch (error) {
      console.error('Error removing background:', error);
      throw error;
    }
  }

  // 5. Text Embeddings for Smart Search (Free!)
  static async getTextEmbeddings(texts: string[]): Promise<number[][]> {
    try {
      const extractor = await pipeline(
        'feature-extraction',
        'mixedbread-ai/mxbai-embed-xsmall-v1',
        { device: 'webgpu' }
      );

      const embeddings = await extractor(texts, { pooling: 'mean', normalize: true });
      return embeddings.tolist();
    } catch (error) {
      console.error('Error getting embeddings:', error);
      throw error;
    }
  }

  // 6. Smart Resource Summarization
  static async summarizeResource(content: string): Promise<string> {
    const apiKey = this.getApiKey('perplexity');
    if (!apiKey) throw new Error('Perplexity API key not found');

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'Summarize the following content in 3-5 bullet points, focusing on key learning objectives and actionable insights for interview preparation.'
            },
            {
              role: 'user',
              content: content.substring(0, 4000) // Limit content size
            }
          ],
          temperature: 0.3,
          max_tokens: 300
        }),
      });

      if (!response.ok) {
        throw new Error(`Summarization error: ${response.statusText}`);
      }

      const data: PerplexityResponse = await response.json();
      return data.choices[0]?.message?.content || 'Unable to generate summary';
    } catch (error) {
      console.error('Error summarizing content:', error);
      throw error;
    }
  }
}