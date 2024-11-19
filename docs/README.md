# Prompt Enhancer

A powerful CLI tool for enhancing AI prompts using advanced language models.

## Overview

Prompt Enhancer helps users create more effective prompts for AI models by transforming basic ideas or poorly structured prompts into well-crafted queries. It leverages Anthropic's Claude and HuggingFace's models to analyze and improve prompts, making advanced prompt engineering accessible to everyone.

## Features

- Direct command-line prompt enhancement
- Interactive mode with command history
- Multiple enhancement types:
  - Clarity
  - Context
  - Specificity
  - Structure
- Integration with popular LLMs:
  - ChatGPT
  - Claude AI
  - Google Gemini
- System clipboard integration
- Persistent session state
- Colorized and animated terminal interface
- Detailed error handling with suggestions

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v7 or higher
- An Anthropic API key

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/prompt-enhancer.git

# Install dependencies
cd prompt-enhancer
npm install

# Build the project
npm run build

# Link globally
npm link
```

### Configuration

Set your Anthropic API key as an environment variable:

```bash
export ANTHROPIC_API_KEY=your-api-key
```

### Basic Usage

```bash
# Direct command-line enhancement
prompt-enhance enhance "Write a story about a dragon"

# Specify enhancement type
prompt-enhance enhance -t specificity "Create a landing page"

# Interactive mode
prompt-enhance enhance

# Debug mode
prompt-enhance enhance --debug "Your prompt"

# Get help
prompt-enhance --help
```

### Interactive Features

- Press 'c' to copy enhanced prompts to clipboard
- Choose from multiple LLM integrations
- Command history navigation
- Session state persistence

## Development

See our [Development Guide](./DEVELOPMENT.md) for detailed information about:
- Setting up your development environment
- Project structure
- Component development
- Testing procedures
- Contributing guidelines

## Testing

Refer to our [Testing Guide](./TESTING.md) for information about:
- Unit testing components
- Integration testing
- End-to-end testing
- Test coverage requirements

## API Documentation

For detailed API documentation, see our [API Guide](./API.md) covering:
- Core package API
- CLI commands
- Error handling
- Service interfaces
