import { HuggingFaceProvider } from '../providers/huggingface.js';
import { LLMProviderError } from '../errors/index.js';

describe('HuggingFaceProvider', () => {
  const mockApiKey = 'hf_test_key';
  let provider: HuggingFaceProvider;

  beforeEach(() => {
    provider = new HuggingFaceProvider(mockApiKey);
  });

  describe('validateApiKey', () => {
    it('should validate correct API key format', () => {
      expect(provider.validateApiKey('hf_valid_key')).toBe(true);
    });

    it('should reject invalid API key format', () => {
      expect(provider.validateApiKey('invalid-key')).toBe(false);
      expect(provider.validateApiKey('')).toBe(false);
    });
  });

  describe('generateCompletion', () => {
    it('should handle API errors gracefully', async () => {
      const invalidProvider = new HuggingFaceProvider('hf_invalid_key');

      await expect(invalidProvider.generateCompletion('test prompt')).rejects.toThrow(
        LLMProviderError
      );
    });
  });
});
