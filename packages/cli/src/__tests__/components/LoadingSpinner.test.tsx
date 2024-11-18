import React from 'react';
import { render } from 'ink-testing-library';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { expect, describe, it } from '@jest/globals';

describe('LoadingSpinner', () => {
  it('renders with default message', () => {
    const { lastFrame } = render(<LoadingSpinner />);
    expect(lastFrame()).toContain('Loading...');
  });

  it('renders with custom message', () => {
    const { lastFrame } = render(
      <LoadingSpinner message="Custom loading message" />
    );
    expect(lastFrame()).toContain('Custom loading message');
  });

  it('renders with submessage when provided', () => {
    const { lastFrame } = render(
      <LoadingSpinner 
        message="Loading..." 
        subMessage="This may take a moment" 
      />
    );
    expect(lastFrame()).toContain('Loading...');
    expect(lastFrame()).toContain('This may take a moment');
  });
});
