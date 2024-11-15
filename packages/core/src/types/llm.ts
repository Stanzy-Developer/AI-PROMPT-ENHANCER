import { z } from 'zod';

export interface LLMProvider {
  generateCompletion(prompt: string, options?: CompletionOptions): Promise<CompletionResult>;
  validateApiKey(apiKey: string): boolean;
}

export interface CompletionOptions {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stop?: string[];
}

export interface CompletionResult {
  text: string;
  usage: TokenUsage;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}
