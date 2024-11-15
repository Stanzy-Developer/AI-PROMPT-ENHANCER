import { program } from 'commander';
import { jest } from '@jest/globals';

describe('CLI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display version information', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    program.parse(['node', 'test', '-v']);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should display help information', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    program.parse(['node', 'test', '--help']);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should handle enhance command with required arguments', () => {
    const mockAction = jest.fn();
    program
      .command('enhance')
      .action(mockAction);
    
    program.parse(['node', 'test', 'enhance', 'test prompt']);
    expect(mockAction).toHaveBeenCalled();
  });
});
