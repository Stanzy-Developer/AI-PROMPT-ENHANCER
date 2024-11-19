import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { ThemedMessage } from './ThemedMessage.js';
import { ClipboardService } from '../utils/clipboard.js';
import { getErrorDetails, formatError } from '../utils/errorHandling.js';

interface CopyDialogProps {
  text: string;
  onClose: () => void;
}

export const CopyDialog: React.FC<CopyDialogProps> = ({ text, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useInput(async (input, key) => {
    if (input.toLowerCase() === 'y') {
      try {
        // Extract the actual prompt content after the prefix
        const cleanText = text.replace(/^Here is the prompt enhanced for clarity:\s*/i, '').trim();
        const success = await ClipboardService.copyToClipboard(cleanText);
        if (success) {
          setCopied(true);
          setCopied(true);
          // Close immediately without timeout
          onClose();
        } else {
          const errorDetails = getErrorDetails(new Error('Failed to copy to clipboard'));
          errorDetails.suggestion = 'Make sure you have clipboard permissions and try again';
          setError(formatError(errorDetails));
        }
      } catch (err) {
        setError('Failed to copy to clipboard');
      }
    } else if (input.toLowerCase() === 'n' || key.escape) {
      onClose();
    }
  });

  if (copied) {
    return (
      <Box flexDirection="column" padding={1}>
        <ThemedMessage type="success">✓ Copied to clipboard!</ThemedMessage>
      </Box>
    );
  }

  if (error) {
    return (
      <Box flexDirection="column" padding={1}>
        <ThemedMessage type="error">{error}</ThemedMessage>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <ThemedMessage type="info">Copy enhanced prompt to clipboard? (y/n)</ThemedMessage>
      <Text dimColor>Press 'y' to copy, 'n' or ESC to cancel</Text>
    </Box>
  );
};
