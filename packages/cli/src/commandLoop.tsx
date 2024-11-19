import React from 'react';
import { render } from 'ink';
import { EnhanceCommand } from './commands/enhance.js';
import { CommandLoopService } from './services/CommandLoopService.js';

const commandLoop = new CommandLoopService();

export const startCommandLoop = async () => {
  commandLoop.start();
  
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', async (data) => {
    const input = data.toString().trim();
    
    if (input === '/exit' || input === '/quit') {
      commandLoop.stop();
      process.exit(0);
    }

    if (input) {
      commandLoop.addToHistory(input);
      
      // Render the enhance command for the input
      const { waitUntilExit } = render(
        <EnhanceCommand
          prompt={input}
          options={{}}
        />
      );

      await waitUntilExit();
    }
  });

  console.log('Prompt Enhancer CLI - Type your prompt or /exit to quit');
};
