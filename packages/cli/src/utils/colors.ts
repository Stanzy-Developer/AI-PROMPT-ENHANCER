import { Color } from 'ink';

export const colors = {
  success: 'green',
  error: 'red',
  info: 'cyan',
  warning: 'yellow',
  header: 'blue',
  prompt: 'magenta',
} as const;

export type ThemeColor = keyof typeof colors;

export const supportsColor = (): boolean => {
  return process.env.FORCE_COLOR !== '0' && process.stdout.isTTY;
};
