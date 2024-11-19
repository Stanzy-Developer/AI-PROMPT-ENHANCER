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

Enhances a prompt using AI. Supports both direct command-line and interactive modes:

```bash
# Direct command-line mode
prompt-enhance enhance [options] <prompt>

# Interactive mode
prompt-enhance enhance
```

Options:
- `-t, --type <type>` - Enhancement type (default: "clarity")
- `-m, --model <model>` - AI model to use (default: "claude-3-opus-20240229")
- `--debug` - Enable debug output

Features:
- Clipboard integration (press 'c' to copy enhanced prompt)
- Direct LLM integration (open enhanced prompt in ChatGPT, Claude, or Gemini)
- Command history tracking
- Session state persistence

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
- `EnhancementError`: Enhancement process errors with detailed error information:
  ```typescript
  interface ErrorDetails {
    message: string;
    code?: string;
    suggestion?: string;
    debug?: any;
  }
  ```

## Command Loop Service

```typescript
class CommandLoopService {
  start(): void;
  stop(): void;
  addToHistory(command: string): void;
  getCommandHistory(): string[];
  addPromptToHistory(original: string, enhanced: string, type: EnhancementType): void;
  getPromptHistory(): PromptHistoryEntry[];
  setConfig(config: Partial<SessionConfig>): void;
  getConfig(): SessionConfig;
}
```
