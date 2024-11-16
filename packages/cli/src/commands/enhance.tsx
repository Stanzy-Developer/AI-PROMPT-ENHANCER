import React, { FC, useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { Spinner } from '@inkjs/ui';
import { AnthropicProvider, EnhancementType, LLMProviderError } from '@prompt-enhancer/core';

interface EnhanceCommandProps {
  prompt: string;
  options: {
    type?: EnhancementType;
    model?: string;
    debug?: boolean;
  };
}

export const EnhanceCommand: FC<EnhanceCommandProps> = ({ prompt, options }) => {
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
        const errorMessage = err instanceof LLMProviderError 
          ? err.message 
          : err instanceof Error 
            ? err.message 
            : 'An unknown error occurred';
        
        setError(errorMessage);
        if (options.debug) {
          console.error('Enhancement error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    enhance();
  }, [prompt, options.type, options.debug, options.model]);

  if (loading) {
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Spinner type="dots" />
          <Text> Enhancing your prompt...</Text>
        </Box>
        <Text dimColor>This may take a few seconds...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box borderStyle="round" borderColor="red" padding={1}>
        <Text color="red" bold>Error: {error}</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box 
        borderStyle="single" 
        borderColor="blue" 
        padding={1} 
        marginBottom={1}
      >
        <Text bold color="blue">Original prompt: </Text>
        <Text>{prompt}</Text>
      </Box>
      <Box 
        borderStyle="single" 
        borderColor="green" 
        padding={1}
      >
        <Text bold color="green">Enhanced prompt: </Text>
        <Text>{enhancedPrompt}</Text>
      </Box>
    </Box>
  );
};
