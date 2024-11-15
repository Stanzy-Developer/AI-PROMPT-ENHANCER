# API Documentation

## Core Package API

### LLMProvider Interface

```typescript
interface LLMProvider {
  generateCompletion(prompt: string, options?: CompletionOptions): Promise<CompletionResult>;
  validateApiKey(apiKey: string): boolean;
}
```

### CompletionOptions

```typescript
interface CompletionOptions {
  maxTokens?: number;      // Maximum tokens to generate
  temperature?: number;    // Randomness (0-1)
  topP?: number;          // Nucleus sampling
  stop?: string[];        // Stop sequences
}
```

### EnhancementType

```typescript
enum EnhancementType {
  CLARITY = 'clarity',
  CONTEXT = 'context',
  SPECIFICITY = 'specificity',
  STRUCTURE = 'structure'
}
```

## CLI Commands

### enhance

Enhances a prompt using AI:

```bash
prompt-enhance enhance [options] <prompt>
```

Options:
- `-t, --type <type>` - Enhancement type (default: "clarity")
- `-m, --model <model>` - AI model to use (default: "claude-3.5-sonnet")
- `--debug` - Enable debug output

### help

Display help information:

```bash
prompt-enhance help [command]
```

### version

Display version information:

```bash
prompt-enhance --version
```

## Error Handling

The API uses custom error classes:

- `LLMProviderError`: API-related errors
- `ValidationError`: Input validation errors
- `PromptEnhancementError`: Enhancement process errors
