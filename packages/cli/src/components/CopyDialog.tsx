import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { ThemedMessage } from './ThemedMessage.js';
import { ClipboardService } from '../utils/clipboard.js';

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
        const success = await ClipboardService.copyToClipboard(text);
        if (success) {
          setCopied(true);
          setTimeout(() => {
            onClose();
            process.exit(0);
          }, 1500); // Close and exit after showing success message
        } else {
          setError('Failed to copy to clipboard');
          setTimeout(() => process.exit(1), 1500);
        }
      } catch (err) {
        setError('Failed to copy to clipboard');
        setTimeout(() => process.exit(1), 1500);
      }
    } else if (input.toLowerCase() === 'n' || key.escape) {
      onClose();
      process.exit(0);
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
