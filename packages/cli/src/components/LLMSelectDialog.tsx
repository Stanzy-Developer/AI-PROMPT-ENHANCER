import React from 'react';
import { Box, Text, useInput } from 'ink';
import { ThemedMessage } from './ThemedMessage.js';

interface LLMSelectDialogProps {
  onSelect: (url: string | null) => void;
}

const LLM_OPTIONS = [
  {
    key: '1',
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
  },
  {
    key: '2',
    name: 'Claude AI',
    url: 'https://claude.ai',
  },
  {
    key: '3',
    name: 'Gemini',
    url: 'https://gemini.google.com/app',
  },
];

export const LLMSelectDialog: React.FC<LLMSelectDialogProps> = ({ onSelect }) => {
  useInput((input, key) => {
    if (key.escape || input.toLowerCase() === 'n') {
      onSelect(null);
      return;
    }

    const option = LLM_OPTIONS.find((opt) => opt.key === input);
    if (option) {
      onSelect(option.url);
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <ThemedMessage type="info">Open in LLM chat? Choose an option:</ThemedMessage>
      {LLM_OPTIONS.map((option) => (
        <Text key={option.key}>
          {option.key}. {option.name}
        </Text>
      ))}
      <Text dimColor>Press option number to select, 'n' or ESC to skip</Text>
    </Box>
  );
};
