const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to VishalMegaMart API',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart/:userId'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 