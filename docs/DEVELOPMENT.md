# Development Guide

## Project Structure

The project uses a monorepo structure managed by Turborepo and npm workspaces:

```
prompt-enhancer/
├── packages/
│   ├── cli/        # CLI application
│   └── core/       # Core functionality and types
├── docs/           # Documentation
└── package.json    # Root package.json
```

## Setup Development Environment

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Run tests:
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

### CLI Package (@prompt-enhancer/cli)

Contains:
- Command-line interface
- Terminal UI components
- User input handling
- State management

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
