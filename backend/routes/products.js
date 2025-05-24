const express = require('express');
const router = express.Router();
const products = require('../data/products');
const categories = require('../data/categories');

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

// Get products by category
router.get('/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  
  if (categoryId === 'all') {
    return res.json(products);
  }
  
  const categoryProducts = products.filter(p => p.category === categoryId);
  
  if (categoryProducts.length === 0) {
    return res.status(404).json({ message: 'No products found in this category' });
  }
  
  res.json(categoryProducts);
});

// Get featured products
router.get('/featured/all', (req, res) => {
  const featuredProducts = products.filter(p => p.featured);
  res.json(featuredProducts);
});

// Get all categories
router.get('/categories/all', (req, res) => {
  res.json(categories);
});

// Search products
router.get('/search/:query', (req, res) => {
  const { query } = req.params;
  const searchQuery = query.toLowerCase();
  
  const searchResults = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery) || 
    product.category.toLowerCase().includes(searchQuery) ||
    (product.description && product.description.toLowerCase().includes(searchQuery))
  );
  
  res.json(searchResults);
});

// Get products on sale
router.get('/filter/on-sale', (req, res) => {
  const saleProducts = products.filter(p => p.onSale);
  res.json(saleProducts);
});

module.exports = router; 