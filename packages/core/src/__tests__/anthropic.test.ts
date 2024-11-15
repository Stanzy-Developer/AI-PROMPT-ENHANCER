import { AnthropicProvider } from '../providers/anthropic';
import { LLMProviderError } from '../errors';

describe('AnthropicProvider', () => {
  const mockApiKey = 'sk-test-key';
  let provider: AnthropicProvider;

  beforeEach(() => {
    provider = new AnthropicProvider(mockApiKey);
  });

  describe('validateApiKey', () => {
    it('should validate correct API key format', () => {
      expect(provider.validateApiKey('sk-valid-key')).toBe(true);
    });

    it('should reject invalid API key format', () => {
      expect(provider.validateApiKey('invalid-key')).toBe(false);
      expect(provider.validateApiKey('')).toBe(false);
    });
  });

  describe('generateCompletion', () => {
    it('should handle API errors gracefully', async () => {
      const invalidProvider = new AnthropicProvider('sk-invalid-key');
      
      await expect(invalidProvider.generateCompletion('test prompt')).rejects.toThrow(
        LLMProviderError
      );
    });
  });
});
