import React from 'react';
import { Text, Box, BoxProps } from 'ink';
import { colors, ThemeColor } from '../utils/colors';

interface ThemedMessageProps extends BoxProps {
  type: ThemeColor;
  children: React.ReactNode;
  bold?: boolean;
}

export const ThemedMessage: React.FC<ThemedMessageProps> = ({ 
  type, 
  children, 
  bold = false,
  ...boxProps 
}) => {
  return (
    <Box {...boxProps}>
      <Text color={colors[type]} bold={bold}>
        {children}
      </Text>
    </Box>
  );
};
