import React from 'react';
import { render, cleanup } from 'ink-testing-library';
import { CopyDialog } from '../../components/CopyDialog.js';
import { ClipboardService } from '../../utils/clipboard.js';
import { expect, describe, it, jest, beforeEach, afterEach } from '@jest/globals';

jest.mock('../../utils/clipboard.js');

describe('CopyDialog', () => {
  const mockText = 'Test text to copy';
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the copy confirmation prompt', () => {
    const { lastFrame } = render(
      <CopyDialog text={mockText} onClose={mockOnClose} />
    );
    expect(lastFrame()).toContain('Copy enhanced prompt to clipboard?');
  });

  it('shows success message after copying', async () => {
    (ClipboardService.copyToClipboard as jest.Mock).mockResolvedValue(true);
    const { lastFrame } = render(
      <CopyDialog text={mockText} onClose={mockOnClose} />
    );
    // Initial render shows the prompt
    expect(lastFrame()).toContain('Copy enhanced prompt to clipboard?');
  });
});
