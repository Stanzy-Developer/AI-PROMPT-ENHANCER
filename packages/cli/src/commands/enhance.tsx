import React from 'react';
import { Box, Text } from 'ink';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { ThemedMessage } from '../components/ThemedMessage.js';
import { AnthropicProvider, EnhancementType, LLMProviderError } from '@prompt-enhancer/core';

console.log('React version:', React.version);

const { useEffect, useState } = React;

interface EnhanceCommandProps {
  prompt: string;
  options: {
    type?: EnhancementType;
    model?: string;
    debug?: boolean;
  };
}

export const EnhanceCommand = ({ prompt, options }: EnhanceCommandProps) => {
  const [enhancedPrompt, setEnhancedPrompt] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const enhance = async () => {
      try {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          throw new Error('ANTHROPIC_API_KEY environment variable is not set');
        }

        const provider = new AnthropicProvider(apiKey);
        const enhancementType = options.type || EnhancementType.CLARITY;

        if (options.debug) {
          console.debug('Enhancement type:', enhancementType);
          console.debug('Model:', options.model);
        }

        const result = await provider.generateCompletion(
          `Enhance this prompt for ${enhancementType}:\n\n${prompt}`
        );

        setEnhancedPrompt(result.text);
      } catch (err) {
        const errorMessage =
          err instanceof LLMProviderError
            ? err.message
            : err instanceof Error
              ? err.message
              : 'An unknown error occurred';

        if (options.debug) {
          console.error('Enhancement error:', err);
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    enhance();
  }, [prompt, options.type, options.debug, options.model]);

  if (loading) {
    return (
      <LoadingSpinner
        message="Enhancing your prompt..."
        subMessage="This may take a few seconds..."
      />
    );
  }

  if (error) {
    return (
      <ThemedMessage type="error" bold padding={1}>
        Error: {error}
      </ThemedMessage>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box borderStyle="single" padding={1} marginBottom={1}>
        <ThemedMessage type="header" bold>
          Original prompt:{' '}
        </ThemedMessage>
        <Text>{prompt}</Text>
      </Box>
      <Box borderStyle="single" padding={1}>
        <ThemedMessage type="success" bold>
          Enhanced prompt:{' '}
        </ThemedMessage>
        <Text>{enhancedPrompt}</Text>
      </Box>
    </Box>
  );
};
