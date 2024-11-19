import { CommandLoopService } from '../../services/CommandLoopService.js';
import { EnhancementType } from '@prompt-enhancer/core';

describe('CommandLoopService', () => {
  let service: CommandLoopService;

  beforeEach(() => {
    service = new CommandLoopService();
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    service.stop();
    localStorage.clear();
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
    
    const history = service.getCommandHistory();
    expect(history).toHaveLength(2);
    expect(history).toContain('test command 1');
    expect(history).toContain('test command 2');
  });

  it('should maintain prompt history', () => {
    service.start();
    
    service.addPromptToHistory(
      'original prompt',
      'enhanced prompt',
      EnhancementType.CLARITY
    );
    
    const history = service.getPromptHistory();
    expect(history).toHaveLength(1);
    expect(history[0].original).toBe('original prompt');
    expect(history[0].enhanced).toBe('enhanced prompt');
    expect(history[0].enhancementType).toBe(EnhancementType.CLARITY);
  });

  it('should persist configuration', () => {
    service.start();
    
    const config = {
      defaultModel: 'test-model',
      defaultEnhancementType: EnhancementType.CLARITY,
    };
    
    service.setConfig(config);
    expect(service.getConfig()).toEqual(config);
  });

  it('should track current provider', () => {
    service.start();
    
    service.setCurrentProvider('test-provider');
    expect(service.getCurrentProvider()).toBe('test-provider');
  });

  it('should persist state across instances', () => {
    service.start();
    service.addToHistory('test command');
    service.setCurrentProvider('test-provider');
    
    // Create new instance
    const newService = new CommandLoopService();
    expect(newService.getCommandHistory()).toContain('test command');
    expect(newService.getCurrentProvider()).toBe('test-provider');
  });
});
