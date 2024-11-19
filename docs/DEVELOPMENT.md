# Development Guide

## Project Structure

The project uses a monorepo structure managed by Turborepo and npm workspaces:

```
prompt-enhancer/
├── packages/
│   ├── cli/        # CLI application
│   │   ├── src/
│   │   │   ├── commands/     # CLI commands
│   │   │   ├── components/   # React components
│   │   │   ├── services/     # Business logic
│   │   │   └── utils/        # Helper functions
│   │   └── __tests__/        # Test files
│   └── core/       # Core functionality and types
├── docs/           # Documentation
└── package.json    # Root package.json
```

## Setup Development Environment

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
export ANTHROPIC_API_KEY=your-api-key
```

3. Build the project:
```bash
npm run build
```

4. Link for local development:
```bash
npm link
```

5. Run tests:
```bash
npm test
```

## Development Workflow

1. Create a new branch for your feature/fix
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

## Code Style

We use:
- TypeScript for type safety
- ESLint for linting
- Prettier for code formatting
- React and Ink for terminal UI

Run formatting:
```bash
npm run format
```

Run linting:
```bash
npm run lint
```

## Package Structure

### Core Package (@prompt-enhancer/core)

Contains:
- LLM provider interfaces
- Type definitions
- Validation schemas
- Error handling
- Provider implementations (Anthropic, HuggingFace)

### CLI Package (@prompt-enhancer/cli)

Contains:
- Command-line interface
- Terminal UI components (using Ink)
- User input handling
- State management
- Clipboard integration
- LLM service integration

## Component Development

React components should:
- Use TypeScript for type safety
- Follow the Ink component model
- Include unit tests
- Support both light and dark terminal themes

## Building

Build all packages:
```bash
npm run build
```

Build specific package:
```bash
cd packages/cli
npm run build
```

## Debugging

Use the `--debug` flag with any command:
```bash
prompt-enhance enhance --debug "Your prompt"
```

Debug logs will show:
- API requests and responses
- Enhancement process details
- Error stack traces
- Performance metrics
