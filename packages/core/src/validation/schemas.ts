import { z } from 'zod';

export const completionOptionsSchema = z.object({
  maxTokens: z.number().min(1).optional(),
  temperature: z.number().min(0).max(1).optional(),
  topP: z.number().min(0).max(1).optional(),
  stop: z.array(z.string()).optional(),
});

export const promptTemplateSchema = z.object({
  id: z.string().min(1),
  template: z.string().min(1),
  variables: z.array(z.object({
    name: z.string().min(1),
    description: z.string(),
    required: z.boolean(),
    defaultValue: z.string().optional(),
  })),
});

export const enhancedPromptSchema = z.object({
  original: z.string().min(1),
  enhanced: z.string().min(1),
  metadata: z.object({
    enhancementType: z.enum(['clarity', 'context', 'specificity', 'structure']),
    timestamp: z.date(),
    tokens: z.number().min(0),
  }),
});
