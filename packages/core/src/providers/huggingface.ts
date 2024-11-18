import { HfInference } from '@huggingface/inference';
import { LLMProvider } from '../types/llm.js';
import { LLMProviderError } from '../errors/index.js';
import { CompletionOptions } from '../types/llm.js';

export class HuggingFaceProvider implements LLMProvider {
  private client: HfInference;
  private static readonly DEFAULT_MODEL = 'mistralai/Mixtral-8x7B-Instruct-v0.1';
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 1000; // 1 second

  constructor(apiKey: string) {
    this.client = new HfInference(apiKey);
  }

  validateApiKey(apiKey: string): boolean {
    return typeof apiKey === 'string' && apiKey.startsWith('hf_');
  }

  async generateCompletion(
    prompt: string,
    options: CompletionOptions = {}
  ): Promise<{ text: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number } }> {
    if (!this.client) {
      throw new LLMProviderError('HuggingFace client not initialized');
    }

    try {
      const response = await this.client.textGeneration({
        model: HuggingFaceProvider.DEFAULT_MODEL,
        inputs: prompt,
        parameters: {
          max_new_tokens: options.maxTokens || 500,
          temperature: options.temperature || 0.7,
          top_p: options.topP || 0.9,
          stop_sequences: options.stop || [],
        },
      });

      // Approximate token counts since HF doesn't provide them directly
      const promptTokens = Math.ceil(prompt.length / 4);
      const completionTokens = Math.ceil(response.generated_text.length / 4);

      return {
        text: response.generated_text,
        usage: {
          promptTokens,
          completionTokens,
          totalTokens: promptTokens + completionTokens,
        },
      };
    } catch (error) {
      throw new LLMProviderError(
        `HuggingFace API error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
