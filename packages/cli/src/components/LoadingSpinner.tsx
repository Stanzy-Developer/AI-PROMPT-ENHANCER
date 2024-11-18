import React from 'react';
import { Box } from 'ink';
import { Spinner } from '@inkjs/ui';
import { ThemedMessage } from './ThemedMessage';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...',
  subMessage
}) => {
  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Spinner type="dots" />
        <ThemedMessage type="info"> {message}</ThemedMessage>
      </Box>
      {subMessage && (
        <ThemedMessage type="info" dimColor>
          {subMessage}
        </ThemedMessage>
      )}
    </Box>
  );
};
