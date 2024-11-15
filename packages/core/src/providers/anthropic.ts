import Anthropic from '@anthropic-ai/sdk';
import { LLMProvider, CompletionOptions, CompletionResult } from '../types/llm';
import { LLMProviderError } from '../errors';

export class AnthropicProvider implements LLMProvider {
  private client: Anthropic;
  private static readonly DEFAULT_MODEL = 'claude-3-sonnet-20240229';
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 1000; // 1 second

  constructor(apiKey: string) {
    this.client = new Anthropic({
      apiKey,
    });
  }

  async generateCompletion(
    prompt: string,
    options?: CompletionOptions
  ): Promise<CompletionResult> {
    try {
      const response = await this.client.messages.create({
        model: AnthropicProvider.DEFAULT_MODEL,
        max_tokens: options?.maxTokens,
        temperature: options?.temperature,
        top_p: options?.topP,
        stop_sequences: options?.stop,
        messages: [{ role: 'user', content: prompt }],
      });

      return {
        text: response.content[0].text,
        usage: {
          promptTokens: response.usage.input_tokens,
          completionTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens,
        },
      };
    } catch (error) {
      if (error instanceof Anthropic.APIError) {
        throw new LLMProviderError(`Anthropic API error: ${error.message}`, error);
      }
      throw new LLMProviderError('Unexpected error during completion', error as Error);
    }
  }

  validateApiKey(apiKey: string): boolean {
    return typeof apiKey === 'string' && apiKey.startsWith('sk-');
  }
}
