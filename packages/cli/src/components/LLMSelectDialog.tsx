import React from 'react';
import { Box, Text, useInput } from 'ink';
import { ThemedMessage } from './ThemedMessage.js';

interface LLMSelectDialogProps {
  onSelect: (url: string | null) => void;
  prompt: string;
}

const LLM_OPTIONS = [
  {
    key: '1',
    name: 'ChatGPT',
    formatUrl: (prompt: string) =>
      `https://chat.openai.com/c/new?prompt=${encodeURIComponent(prompt)}`,
  },
  {
    key: '2',
    name: 'Claude AI',
    formatUrl: (prompt: string) =>
      `https://claude.ai/chat/new?prompt=${encodeURIComponent(prompt)}`,
  },
  {
    key: '3',
    name: 'Gemini',
    formatUrl: (prompt: string) =>
      `https://gemini.google.com/app?text=${encodeURIComponent(prompt)}`,
  },
];

export const LLMSelectDialog: React.FC<LLMSelectDialogProps> = ({ onSelect, prompt }) => {
  useInput((input, key) => {
    if (key.escape || input.toLowerCase() === 'n') {
      onSelect(null);
      return;
    }

    const option = LLM_OPTIONS.find((opt) => opt.key === input);
    if (option) {
      onSelect(option.formatUrl(prompt));
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
