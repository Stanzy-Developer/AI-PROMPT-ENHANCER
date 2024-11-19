# Testing Guide

## Testing Strategy

We use Jest for testing across all packages. Our testing approach includes:

- Unit tests for individual components
- Integration tests for API interactions
- End-to-end tests for CLI functionality
- React component testing with ink-testing-library

## Running Tests

Run all tests:
```bash
npm test
```

Run tests for specific package:
```bash
cd packages/cli
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Writing Tests

### React Component Tests

Use ink-testing-library for testing Ink components:

```typescript
import { render } from 'ink-testing-library';
import { EnhanceCommand } from '../commands/enhance';

describe('EnhanceCommand', () => {
  it('should render enhancement options', () => {
    const { lastFrame } = render(
      <EnhanceCommand 
        prompt="test prompt"
        options={{ type: EnhancementType.CLARITY }}
      />
    );
    expect(lastFrame()).toContain('Enhancing your prompt');
  });
});
```

### Service Tests

Test service classes with proper mocking:

```typescript
import { CommandLoopService } from '../services/CommandLoopService';

describe('CommandLoopService', () => {
  let service: CommandLoopService;

  beforeEach(() => {
    service = new CommandLoopService();
  });

  it('should maintain command history', () => {
    service.addToHistory('test command');
    expect(service.getCommandHistory()).toContain('test command');
  });
});
```

### Integration Tests

Integration tests should:
- Mock external services (Anthropic, HuggingFace)
- Test error conditions and recovery
- Verify clipboard operations
- Test LLM integrations
- Verify session state persistence

### CLI Tests

CLI tests should verify:
- Command parsing and validation
- Enhancement type handling
- Interactive mode functionality
- Clipboard integration
- LLM selection dialog
- Error handling and recovery
- Session state management

## Test Coverage

Generate coverage report:
```bash
npm test -- --coverage
```

We aim for:
- 80% overall coverage
- 100% coverage for:
  - Core enhancement logic
  - Error handling
  - CLI commands
  - React components


<!-- /web  http://127.0.0.1:5500/FormattedProblemStatement.html -->
<!-- /web  http://127.0.0.1:5500/RequirementsDocument.html --> 
<!-- /web  http://127.0.0.1:5500/SolutionDocument.html -->
<!-- /web  http://127.0.0.1:5500/Sprint-2DevTickets.html -->
<!-- /web  http://127.0.0.1:5500/.html-->
<!-- /web  http://127.0.0.1:5500/.html-->
