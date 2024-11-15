import { completionOptionsSchema, promptTemplateSchema, enhancedPromptSchema } from '../validation/schemas';
import { EnhancementType } from '../types/prompt';

describe('Validation Schemas', () => {
  describe('completionOptionsSchema', () => {
    it('should validate valid completion options', () => {
      const validOptions = {
        maxTokens: 100,
        temperature: 0.7,
        topP: 0.9,
        stop: ['###'],
      };
      
      expect(() => completionOptionsSchema.parse(validOptions)).not.toThrow();
    });

    it('should reject invalid completion options', () => {
      const invalidOptions = {
        maxTokens: -1,
        temperature: 2,
      };
      
      expect(() => completionOptionsSchema.parse(invalidOptions)).toThrow();
    });
  });

  describe('promptTemplateSchema', () => {
    it('should validate valid prompt template', () => {
      const validTemplate = {
        id: 'test-template',
        template: 'Hello {{name}}',
        variables: [{
          name: 'name',
          description: 'User name',
          required: true,
        }],
      };
      
      expect(() => promptTemplateSchema.parse(validTemplate)).not.toThrow();
    });
  });

  describe('enhancedPromptSchema', () => {
    it('should validate valid enhanced prompt', () => {
      const validEnhancedPrompt = {
        original: 'Hello',
        enhanced: 'Hello there',
        metadata: {
          enhancementType: EnhancementType.CLARITY,
          timestamp: new Date(),
          tokens: 10,
        },
      };
      
      expect(() => enhancedPromptSchema.parse(validEnhancedPrompt)).not.toThrow();
    });
  });
});
