# Peigen Test Server

A simple Express.js mock API server for testing Peigen API client.

## Installation

```bash
cd test-server
npm install
```

## Running the Server

```bash
# Start the server
npm start

# Or use nodemon for auto-restart during development
npm run dev
```

The server will run on `http://localhost:3001`

## Available Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Users API
- `GET /api/users` - Get all users (supports ?role=admin&search=john)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
  ```
- `PUT /api/users/:id` - Update user (full replace)
- `PATCH /api/users/:id` - Partial update user
- `DELETE /api/users/:id` - Delete user

### Posts API
- `GET /api/posts` - Get all posts (supports ?userId=1)
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
  ```json
  {
    "title": "My Post",
    "content": "Post content here",
    "userId": 1
  }
  ```
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Products API
- `GET /api/products` - Get all products (supports ?category=Electronics&inStock=true&minPrice=100&maxPrice=1000)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
  ```json
  {
    "name": "Laptop",
    "price": 999.99,
    "category": "Electronics",
    "inStock": true
  }
  ```

### Authentication API
- `POST /api/auth/login` - Login
  ```json
  {
    "email": "john@example.com",
    "password": "any-password"
  }
  ```
- `POST /api/auth/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- `GET /api/auth/profile` - Get user profile (requires Bearer token in Authorization header)

### Testing Endpoints
- `GET /api/error/500` - Returns 500 error
- `GET /api/delay/:seconds` - Delayed response (max 10 seconds)

## Example Usage with Peigen

1. Start this test server: `npm start` (runs on port 3001)
2. Start Peigen app: `npm start` (runs on port 3000)
3. In Peigen, use base URL: `http://localhost:3001`

### Example Requests

**Get all users:**
- Method: GET
- URL: `http://localhost:3001/api/users`

**Create a user:**
- Method: POST
- URL: `http://localhost:3001/api/users`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "admin"
  }
  ```

**Login:**
- Method: POST
- URL: `http://localhost:3001/api/auth/login`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "email": "john@example.com",
    "password": "test123"
  }
  ```

**Get profile with token:**
- Method: GET
- URL: `http://localhost:3001/api/auth/profile`
- Headers: `Authorization: Bearer mock-jwt-token-1234567890-1`

## Features

✅ CORS enabled (works with Peigen running on different port)
✅ In-memory data storage (resets on server restart)
✅ RESTful API design
✅ Supports GET, POST, PUT, PATCH, DELETE methods
✅ Query parameter filtering
✅ Bearer token authentication example
✅ Error simulation for testing
✅ Response delay simulation for timeout testing

## Notes

- All data is stored in memory and will reset when server restarts
- No actual password validation (accepts any password for login)
- Mock JWT tokens for testing authentication
- Designed for testing purposes only - NOT for production use
