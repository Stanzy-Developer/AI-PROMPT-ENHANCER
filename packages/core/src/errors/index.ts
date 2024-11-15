export class LLMProviderError extends Error {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'LLMProviderError';
  }
}

export class ValidationError extends Error {
  constructor(message: string, public readonly errors: string[]) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class PromptEnhancementError extends Error {
  constructor(message: string, public readonly prompt: string) {
    super(message);
    this.name = 'PromptEnhancementError';
  }
}
