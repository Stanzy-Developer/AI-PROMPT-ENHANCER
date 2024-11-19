import { EnhancementType } from '@prompt-enhancer/core';
import { EventEmitter } from 'events';

interface CommandState {
  history: string[];
  currentProvider: string;
  lastEnhancementType?: EnhancementType;
}

export class CommandLoopService {
  private state: CommandState;
  private events: EventEmitter;
  private running: boolean = false;

  constructor() {
    this.state = {
      history: [],
      currentProvider: 'anthropic',
    };
    this.events = new EventEmitter();
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
    this.state.history.push(command);
  }

  public getHistory(): string[] {
    return [...this.state.history];
  }

  private setupHandlers(): void {
    // Set up command handlers
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
    // Clear state
    this.state.history = [];
  }

  public isRunning(): boolean {
    return this.running;
  }
}
