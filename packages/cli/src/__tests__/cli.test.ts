import { program } from 'commander';

describe('CLI', () => {
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display version information', () => {
    program.parse(['node', 'test', '-v']);
    expect(mockConsoleLog).toHaveBeenCalled();
  });

  it('should display help information', () => {
    program.parse(['node', 'test', '--help']);
    expect(mockConsoleLog).toHaveBeenCalled();
  });

  it('should handle enhance command with required arguments', () => {
    const mockAction = jest.fn().mockImplementation(() => {});
    program
      .command('enhance')
      .action(mockAction);
    
    program.parse(['node', 'test', 'enhance', 'test prompt']);
    expect(mockAction).toHaveBeenCalled();
  });
});
