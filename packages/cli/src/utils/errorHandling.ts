import chalk from 'chalk';

export interface ErrorDetails {
  message: string;
  code?: string;
  suggestion?: string;
  debug?: any;
}

export class EnhancementError extends Error {
  code: string;
  suggestion?: string;
  debug?: any;

  constructor({ message, code = 'UNKNOWN_ERROR', suggestion, debug }: ErrorDetails) {
    super(message);
    this.code = code;
    this.suggestion = suggestion;
    this.debug = debug;
    this.name = 'EnhancementError';
  }
}

export const formatError = (error: ErrorDetails): string => {
  const parts = [
    chalk.red.bold(`Error ${error.code ? `[${error.code}]` : ''}`),
    chalk.red(error.message),
  ];

  if (error.suggestion) {
    parts.push(chalk.yellow('\nSuggestion: ') + error.suggestion);
  }

  return parts.join('\n');
};

export const getErrorDetails = (error: unknown): ErrorDetails => {
  if (error instanceof EnhancementError) {
    return {
      message: error.message,
      code: error.code,
      suggestion: error.suggestion,
      debug: error.debug,
    };
  }

  if (error instanceof Error) {
    if (error.message.includes('ANTHROPIC_API_KEY')) {
      return {
        message: 'API key not configured',
        code: 'AUTH_ERROR',
        suggestion: 'Set the ANTHROPIC_API_KEY environment variable with your API key',
      };
    }

    return {
      message: error.message,
      code: 'SYSTEM_ERROR',
      suggestion: 'Try running the command again. If the problem persists, check your internet connection.',
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    suggestion: 'Try running the command again with --debug flag for more information',
  };
};
