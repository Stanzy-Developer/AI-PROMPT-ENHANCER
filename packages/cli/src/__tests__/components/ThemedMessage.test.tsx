import React from 'react';
import { render } from 'ink-testing-library/build/index.js';
import { ThemedMessage } from '../../components/ThemedMessage';
import { expect, describe, it } from '@jest/globals';

describe('ThemedMessage', () => {
  it('renders success message in green', () => {
    const { lastFrame } = render(
      <ThemedMessage type="success">Success message</ThemedMessage>
    );
    expect(lastFrame()).toContain('Success message');
  });

  it('renders error message in red', () => {
    const { lastFrame } = render(
      <ThemedMessage type="error">Error message</ThemedMessage>
    );
    expect(lastFrame()).toContain('Error message');
  });

  it('renders with bold text when specified', () => {
    const { lastFrame } = render(
      <ThemedMessage type="info" bold>
        Bold info message
      </ThemedMessage>
    );
    expect(lastFrame()).toContain('Bold info message');
  });
});
