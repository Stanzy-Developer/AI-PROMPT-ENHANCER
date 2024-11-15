export interface PromptTemplate {
  id: string;
  template: string;
  variables: TemplateVariable[];
}

export interface TemplateVariable {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

export interface EnhancedPrompt {
  original: string;
  enhanced: string;
  metadata: PromptMetadata;
}

export interface PromptMetadata {
  enhancementType: EnhancementType;
  timestamp: Date;
  tokens: number;
}

export enum EnhancementType {
  CLARITY = 'clarity',
  CONTEXT = 'context',
  SPECIFICITY = 'specificity',
  STRUCTURE = 'structure'
}
