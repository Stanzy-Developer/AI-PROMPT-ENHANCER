# Testing Guide

## Testing Strategy

We use Jest for testing across all packages. Our testing approach includes:

- Unit tests for individual components
- Integration tests for API interactions
- End-to-end tests for CLI functionality

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

### Unit Tests

Place unit tests in `__tests__` directories next to the code being tested:

```typescript
import { something } from '../something';

describe('something', () => {
  it('should do something', () => {
    expect(something()).toBe(true);
  });
});
```

### Integration Tests

Integration tests should:
- Mock external services
- Test error conditions
- Verify API interactions

### CLI Tests

CLI tests should verify:
- Command parsing
- User input handling
- Output formatting
- Error scenarios

## Test Coverage

Generate coverage report:
```bash
npm test -- --coverage
```

We aim for:
- 80% overall coverage
- 100% coverage for critical paths


<!-- /web  http://127.0.0.1:5500/FormattedProblemStatement.html -->
<!-- /web  http://127.0.0.1:5500/RequirementsDocument.html --> 
<!-- /web  http://127.0.0.1:5500/SolutionDocument.html -->
<!-- /web  http://127.0.0.1:5500/Sprint-2DevTickets.html -->
<!-- /web  http://127.0.0.1:5500/.html-->
<!-- /web  http://127.0.0.1:5500/.html-->
