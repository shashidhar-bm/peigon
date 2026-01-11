const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data store
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

let posts = [
  { id: 1, title: 'First Post', content: 'Hello World!', userId: 1, createdAt: new Date().toISOString() },
  { id: 2, title: 'Second Post', content: 'Testing APIs', userId: 2, createdAt: new Date().toISOString() }
];

let products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', inStock: true },
  { id: 2, name: 'Phone', price: 599.99, category: 'Electronics', inStock: true },
  { id: 3, name: 'Desk Chair', price: 299.99, category: 'Furniture', inStock: false }
];

// ============== ROOT ENDPOINT ==============
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Peigen Test Server',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts',
      products: '/api/products',
      auth: '/api/auth',
      health: '/api/health'
    }
  });
});

// ============== HEALTH CHECK ==============
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ============== USERS ENDPOINTS ==============

// GET all users
app.get('/api/users', (req, res) => {
  const { role, search } = req.query;
  let filteredUsers = users;

  if (role) {
    filteredUsers = filteredUsers.filter(u => u.role === role);
  }

  if (search) {
    filteredUsers = filteredUsers.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({
    success: true,
    count: filteredUsers.length,
    data: filteredUsers
  });
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// POST create new user
app.post('/api/users', (req, res) => {
  const { name, email, role = 'user' } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required'
    });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
    role
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// PUT update user (without ID in URL)
app.put('/api/users', (req, res) => {
  const { id } = req.body;
  const userId = parseInt(id);

  if (!id || isNaN(userId)) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required in the request body'
    });
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  users[userIndex] = { ...users[userIndex], ...req.body, id: userId };

  res.json({
    success: true,
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  users[userIndex] = { ...users[userIndex], ...req.body, id: userId };

  res.json({
    success: true,
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser
  });
});

// PATCH partial update user
app.patch('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  users[userIndex] = { ...users[userIndex], ...req.body };

  res.json({
    success: true,
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

// ============== POSTS ENDPOINTS ==============

// GET all posts
app.get('/api/posts', (req, res) => {
  const { userId } = req.query;
  let filteredPosts = posts;

  if (userId) {
    filteredPosts = filteredPosts.filter(p => p.userId === parseInt(userId));
  }

  res.json({
    success: true,
    count: filteredPosts.length,
    data: filteredPosts
  });
});

// GET post by ID
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  
  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  res.json({
    success: true,
    data: post
  });
});

// POST create new post
app.post('/api/posts', (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Title and content are required'
    });
  }

  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    title,
    content,
    userId: userId || 1,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: newPost
  });
});

// PUT update post
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  posts[postIndex] = { 
    ...posts[postIndex], 
    ...req.body, 
    id: postId,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Post updated successfully',
    data: posts[postIndex]
  });
});

// DELETE post
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  const deletedPost = posts.splice(postIndex, 1)[0];

  res.json({
    success: true,
    message: 'Post deleted successfully',
    data: deletedPost
  });
});

// ============== PRODUCTS ENDPOINTS ==============

// GET all products
app.get('/api/products', (req, res) => {
  const { category, inStock, minPrice, maxPrice } = req.query;
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (inStock !== undefined) {
    filteredProducts = filteredProducts.filter(p => 
      p.inStock === (inStock === 'true')
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }

  res.json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts
  });
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    data: product
  });
});

// POST create new product
app.post('/api/products', (req, res) => {
  const { name, price, category, inStock = true } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      message: 'Name, price, and category are required'
    });
  }

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    price: parseFloat(price),
    category,
    inStock
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct
  });
});

// ============== AUTH ENDPOINTS ==============

// POST login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Mock token generation
  const token = `mock-jwt-token-${Date.now()}-${user.id}`;

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token
    }
  });
});

// POST register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required'
    });
  }

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User already exists'
    });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
    role: 'user'
  };

  users.push(newUser);

  const token = `mock-jwt-token-${Date.now()}-${newUser.id}`;

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      user: newUser,
      token
    }
  });
});

// GET with bearer token auth (example)
app.get('/api/auth/profile', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }

  const token = authHeader.substring(7);

  // Mock token validation
  if (!token.startsWith('mock-jwt-token-')) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  // Extract user ID from mock token
  const parts = token.split('-');
  const userId = parseInt(parts[parts.length - 1]);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// ============== ERROR SIMULATION ==============

// Simulate 500 error
app.get('/api/error/500', (req, res) => {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: 'Something went wrong on the server'
  });
});

// Simulate timeout (delayed response)
app.get('/api/delay/:seconds', (req, res) => {
  const seconds = parseInt(req.params.seconds) || 1;
  const delay = Math.min(seconds * 1000, 10000); // Max 10 seconds

  setTimeout(() => {
    res.json({
      success: true,
      message: `Response delayed by ${seconds} seconds`,
      timestamp: new Date().toISOString()
    });
  }, delay);
});

// ============== 404 HANDLER ==============
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// ============== START SERVER ==============
app.listen(PORT, () => {
  console.log(`\n🚀 Peigen Test Server is running!`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`\n📚 Available Endpoints:`);
  console.log(`   GET    /api/health           - Health check`);
  console.log(`   GET    /api/users            - Get all users`);
  console.log(`   GET    /api/users/:id        - Get user by ID`);
  console.log(`   POST   /api/users            - Create new user`);
  console.log(`   PUT    /api/users/:id        - Update user`);
  console.log(`   PATCH  /api/users/:id        - Partial update user`);
  console.log(`   DELETE /api/users/:id        - Delete user`);
  console.log(`   GET    /api/posts            - Get all posts`);
  console.log(`   GET    /api/posts/:id        - Get post by ID`);
  console.log(`   POST   /api/posts            - Create new post`);
  console.log(`   PUT    /api/posts/:id        - Update post`);
  console.log(`   DELETE /api/posts/:id        - Delete post`);
  console.log(`   GET    /api/products         - Get all products`);
  console.log(`   GET    /api/products/:id     - Get product by ID`);
  console.log(`   POST   /api/products         - Create new product`);
  console.log(`   POST   /api/auth/login       - Login`);
  console.log(`   POST   /api/auth/register    - Register`);
  console.log(`   GET    /api/auth/profile     - Get profile (requires Bearer token)`);
  console.log(`   GET    /api/error/500        - Simulate server error`);
  console.log(`   GET    /api/delay/:seconds   - Delayed response\n`);
});
