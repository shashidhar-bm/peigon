# Peigen - API Testing Tool

A feature-rich API testing tool built with React and TypeScript.

## Features

- **Request Builder**: Support for GET, POST, PUT, DELETE, PATCH methods
- **Response Viewer**: Beautiful response display with syntax highlighting
- **Collections**: Organize and save your API requests
- **Environment Variables**: Manage different environments (Dev, Staging, Prod)
- **Request History**: Automatically saves your last 50 requests
- **Import/Export**: Share collections in JSON format

## Tech Stack

- React 18 with TypeScript
- Styled Components for styling
- Context API for state management
- Axios for HTTP requests
- localStorage for data persistence
- Jest + React Testing Library for unit tests
- Cypress for E2E tests

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Running the Test Server (Optional)

A dummy API server is included for testing:

```bash
cd test-server
npm install
npm start
```

The test server will run on [http://localhost:3001](http://localhost:3001)

See `test-server/README.md` for available API endpoints.

### Running Tests

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/        # React Context providers
├── hooks/           # Custom React hooks
├── services/        # Business logic
├── utils/           # Helper functions
├── constants/       # App constants
├── types/           # TypeScript types
└── styles/          # Global styles & theme
```

## Usage

1. **Making a Request**:
   - Select HTTP method
   - Enter URL
   - Add headers, params, or body as needed
   - Click Send

2. **Saving Requests**:
   - Create a collection
   - Add requests to collections
   - Export collections for sharing

3. **Using Variables**:
   - Create an environment
   - Define variables like `{{baseUrl}}`
   - Use them in your requests

## License

MIT

