import React, { FC, useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { AnthropicProvider } from '@prompt-enhancer/core/dist/index.js';
import { EnhancementType } from '@prompt-enhancer/core/dist/index.js';

interface EnhanceCommandProps {
  prompt: string;
  options: {
    type?: string;
  };
}

export const EnhanceCommand: FC<EnhanceCommandProps> = ({ prompt, options }) => {
  const [enhancedPrompt, setEnhancedPrompt] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const enhance = async () => {
      try {
        const provider = new AnthropicProvider(process.env.ANTHROPIC_API_KEY || '');
        const enhancementType = options.type as EnhancementType || EnhancementType.CLARITY;
        
        const result = await provider.generateCompletion(
          `Enhance this prompt for ${enhancementType}: ${prompt}`
        );
        
        setEnhancedPrompt(result.text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    enhance();
  }, [prompt, options.type]);

  if (loading) {
    return <Text>Enhancing prompt...</Text>;
  }

  if (error) {
    return <Text color="red">Error: {error}</Text>;
  }

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold>Original prompt:</Text>
        <Text> {prompt}</Text>
      </Box>
      <Box>
        <Text bold>Enhanced prompt:</Text>
        <Text> {enhancedPrompt}</Text>
      </Box>
    </Box>
  );
};
