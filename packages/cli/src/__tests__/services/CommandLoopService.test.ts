import { CommandLoopService } from '../../services/CommandLoopService.js';

describe('CommandLoopService', () => {
  let service: CommandLoopService;

  beforeEach(() => {
    service = new CommandLoopService();
  });

  afterEach(() => {
    service.stop();
  });

  it('should start and stop correctly', () => {
    service.start();
    expect(service.isRunning()).toBe(true);
    
    service.stop();
    expect(service.isRunning()).toBe(false);
  });

  it('should maintain command history', () => {
    service.start();
    
    service.addToHistory('test command 1');
    service.addToHistory('test command 2');
    
    const history = service.getHistory();
    expect(history).toHaveLength(2);
    expect(history).toContain('test command 1');
    expect(history).toContain('test command 2');
  });

  it('should clear history on cleanup', () => {
    service.start();
    service.addToHistory('test command');
    
    service.stop();
    expect(service.getHistory()).toHaveLength(0);
  });
});
