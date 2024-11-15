# Prompt Enhancer

A powerful CLI tool for enhancing AI prompts using advanced language models.

## Overview

Prompt Enhancer helps users create more effective prompts for AI models by transforming basic ideas or poorly structured prompts into well-crafted queries. It leverages Anthropic's Claude API to analyze and improve prompts, making advanced prompt engineering accessible to everyone.

## Features

- CLI-based prompt enhancement
- Interactive clarification system
- Anthropic Claude integration
- Colorized and animated terminal interface
- System clipboard integration
- Command-based interface

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
```

### Configuration

Set your Anthropic API key as an environment variable:

```bash
export ANTHROPIC_API_KEY=your-api-key
```

### Basic Usage

```bash
# Enhance a simple prompt
prompt-enhance enhance "Write a story about a dragon"

# Use specific enhancement type
prompt-enhance enhance -t specificity "Create a landing page"

# Get help
prompt-enhance --help
```

## Development

See our [Development Guide](./DEVELOPMENT.md) for detailed information about setting up your development environment and contributing to the project.

## Testing

Refer to our [Testing Guide](./TESTING.md) for information about our testing strategy and how to run tests.

## API Documentation

For detailed API documentation, see our [API Guide](./API.md).
