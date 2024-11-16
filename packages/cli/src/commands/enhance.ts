import { FC, useEffect, useState } from 'react';
import { Box, Text, Spinner } from 'ink';
import { AnthropicProvider, EnhancementType } from '@prompt-enhancer/core';

interface EnhanceCommandProps {
  prompt: string;
  options: {
    type?: string;
    model?: string;
    debug?: boolean;
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
    return (
      <Box flexDirection="column" padding={1}>
        <Spinner type="dots" />
        <Text dimColor>Enhancing your prompt...</Text>
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
import React, { FC, useState, useEffect } from 'react';
import { Text, Box, Spinner } from 'ink';
import { AnthropicProvider } from '@prompt-enhancer/core';
import { EnhancementType } from '@prompt-enhancer/core';

interface EnhanceCommandProps {
  prompt: string;
  options: {
    type: EnhancementType;
    model: string;
    debug?: boolean;
  };
}

export const EnhanceCommand: FC<EnhanceCommandProps> = ({ prompt, options }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);

  useEffect(() => {
    const enhance = async () => {
      try {
        const provider = new AnthropicProvider(process.env.ANTHROPIC_API_KEY || '');
        const result = await provider.generateCompletion(
          `Enhance this prompt for ${options.type}: ${prompt}`
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

  if (error) {
    return (
      <Box borderStyle="round" borderColor="red" padding={1}>
        <Text color="red">Error: {error}</Text>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box>
        <Spinner type="dots" />
        <Text> Enhancing prompt...</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box borderStyle="round" borderColor="yellow" padding={1} marginBottom={1}>
        <Text color="yellow">Original Prompt:</Text>
        <Text>{prompt}</Text>
      </Box>
      
      <Box borderStyle="round" borderColor="green" padding={1}>
        <Text color="green">Enhanced Prompt:</Text>
        <Text>{enhancedPrompt}</Text>
      </Box>
    </Box>
  );
};
