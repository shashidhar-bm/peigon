# Contributing to Postman Clone

Thank you for your interest in contributing to this project!

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Run tests: `npm test`

## Project Structure

```
src/
├── components/       # React components
│   ├── common/      # Reusable UI components
│   ├── layout/      # Layout components
│   ├── request/     # Request-related components
│   ├── response/    # Response-related components
│   └── collections/ # Collection management
├── contexts/        # React Context providers
├── hooks/           # Custom React hooks
├── services/        # Business logic & API services
├── utils/           # Utility functions
├── constants/       # Application constants
├── types/           # TypeScript type definitions
└── styles/          # Global styles & theme
```

## Coding Guidelines

1. **TypeScript**: All new code should be written in TypeScript
2. **Components**: Use functional components with hooks
3. **Styling**: Use styled-components for styling
4. **Testing**: Write tests for new features
5. **Naming**: Use descriptive variable names

## Testing

- Unit tests: `npm test`
- Integration tests: `npm run test:integration`
- E2E tests: `npm run test:e2e`
- Coverage: `npm run test:coverage`

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Add/update tests as needed
4. Ensure all tests pass
5. Submit a pull request

## Code Style

- Run `npm run lint` before committing
- Follow existing code patterns
- Keep functions small and focused
- Write clear comments for complex logic

## Questions?

Feel free to open an issue for any questions or concerns.

