import React from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { ThemedMessage } from '../components/ThemedMessage.js';
import { CopyDialog } from '../components/CopyDialog.js';
import { AnthropicProvider, EnhancementType } from '@prompt-enhancer/core';
import { getErrorDetails, formatError } from '../utils/errorHandling.js';
import { LLMSelectDialog } from '../components/LLMSelectDialog.js';
import { exec } from 'child_process';
import { CommandLoopService } from '../services/CommandLoopService.js';

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
  const { exit } = useApp();
  const [enhancedPrompt, setEnhancedPrompt] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCopyDialog, setShowCopyDialog] = useState(false);
  const [showLLMDialog, setShowLLMDialog] = useState(false);

  useInput(
    (input) => {
      if (input === 'c' && enhancedPrompt && !loading && !error) {
        setShowCopyDialog(true);
      }
    },
    { isActive: !showCopyDialog }
  );

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
          `Enhance this prompt for ${enhancementType}. Return ONLY the enhanced prompt with no additional text, explanations, or prefixes:\n\n${prompt}`
        );

        setEnhancedPrompt(result.text);

        // Store in session history
        const commandLoop = new CommandLoopService();
        commandLoop.addPromptToHistory(prompt, result.text, enhancementType);
      } catch (err) {
        const errorDetails = getErrorDetails(err);

        if (options.debug) {
          console.error('Enhancement error:', {
            ...errorDetails,
            originalError: err,
          });
        }

        setError(formatError(errorDetails));
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
      <Box marginTop={1}>
        <Text dimColor>Press 'c' to copy the enhanced prompt</Text>
      </Box>
      {showCopyDialog && (
        <CopyDialog
          text={enhancedPrompt}
          onClose={() => {
            setShowCopyDialog(false);
            setShowLLMDialog(true);
          }}
        />
      )}
      {showLLMDialog && (
        <LLMSelectDialog
          prompt={enhancedPrompt}
          onSelect={(url) => {
            if (url) {
              // Open the selected LLM chat in the default browser
              const command =
                process.platform === 'darwin'
                  ? 'open'
                  : process.platform === 'win32'
                    ? 'start'
                    : 'xdg-open';
              exec(`${command} "${url}"`);
            }
            // Reset the copied state to allow for future copying
            process.stdout.write('\n');
            // Signal completion to command loop
            exit();
          }}
        />
      )}
    </Box>
  );
};
