import { EnhancementType } from '@prompt-enhancer/core';
import { EventEmitter } from 'events';

interface SessionState {
  commandHistory: string[];
  promptHistory: {
    original: string;
    enhanced: string;
    timestamp: Date;
    enhancementType: EnhancementType;
  }[];
  currentProvider: string;
  lastEnhancementType?: EnhancementType;
  config: {
    defaultModel?: string;
    defaultEnhancementType?: EnhancementType;
  };
}

export class CommandLoopService {
  private state: SessionState;
  private events: EventEmitter;
  private running: boolean = false;
  private static readonly STATE_FILE = '.prompt-enhancer-session';

  constructor() {
    this.state = this.loadState() || {
      commandHistory: [],
      promptHistory: [],
      currentProvider: 'anthropic',
      config: {},
    };
    this.events = new EventEmitter();
  }

  private loadState(): SessionState | null {
    try {
      const data = localStorage.getItem(CommandLoopService.STATE_FILE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private saveState(): void {
    try {
      localStorage.setItem(
        CommandLoopService.STATE_FILE,
        JSON.stringify(this.state)
      );
    } catch (error) {
      console.error('Failed to save session state:', error);
    }
  }

  public start(): void {
    this.running = true;
    this.setupHandlers();
    
    // Handle clean exit
    process.on('SIGINT', () => {
      this.cleanup();
      process.exit(0);
    });
  }

  public stop(): void {
    this.running = false;
    this.cleanup();
  }

  public addToHistory(command: string): void {
    this.state.commandHistory.push(command);
    this.saveState();
  }

  public getCommandHistory(): string[] {
    return [...this.state.commandHistory];
  }

  public addPromptToHistory(
    original: string,
    enhanced: string,
    enhancementType: EnhancementType
  ): void {
    this.state.promptHistory.push({
      original,
      enhanced,
      timestamp: new Date(),
      enhancementType,
    });
    this.saveState();
  }

  public getPromptHistory() {
    return [...this.state.promptHistory];
  }

  public setConfig(config: Partial<SessionState['config']>): void {
    this.state.config = { ...this.state.config, ...config };
    this.saveState();
  }

  public getConfig() {
    return { ...this.state.config };
  }

  public setCurrentProvider(provider: string): void {
    this.state.currentProvider = provider;
    this.saveState();
  }

  public getCurrentProvider(): string {
    return this.state.currentProvider;
  }

  private setupHandlers(): void {
    this.events.on('command', (cmd: string) => {
      if (cmd === '/exit' || cmd === '/quit') {
        this.stop();
        return;
      }
      this.addToHistory(cmd);
    });
  }

  private cleanup(): void {
    this.events.removeAllListeners();
    this.saveState();
  }

  public isRunning(): boolean {
    return this.running;
  }
}
