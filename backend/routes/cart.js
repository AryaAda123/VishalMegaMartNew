const express = require('express');
const router = express.Router();
const products = require('../data/products');

// In-memory cart storage (in a real app, this would be in a database)
let cart = [];

// Get cart items
router.get('/', (req, res) => {
  res.json(cart);
});

// Add item to cart
router.post('/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }
  
  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex(item => item.productId === productId);
  
  if (existingItemIndex !== -1) {
    // Update quantity if product already in cart
    cart[existingItemIndex].quantity += quantity;
    return res.json({ message: 'Cart updated successfully', cart });
  } else {
    // Add new item to cart
    cart.push({ productId, quantity });
    return res.json({ message: 'Item added to cart', cart });
  }
});

// Update cart item quantity
router.put('/update', (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!productId || quantity === undefined) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }
  
  const itemIndex = cart.findIndex(item => item.productId === productId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    cart = cart.filter(item => item.productId !== productId);
    return res.json({ message: 'Item removed from cart', cart });
  } else {
    // Update quantity
    cart[itemIndex].quantity = quantity;
    return res.json({ message: 'Cart updated successfully', cart });
  }
});

// Remove item from cart
router.delete('/remove/:productId', (req, res) => {
  const productId = req.params.productId;
  
  const itemIndex = cart.findIndex(item => item.productId === productId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }
  
  cart = cart.filter(item => item.productId !== productId);
  res.json({ message: 'Item removed from cart', cart });
});

// Clear cart
router.delete('/clear', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared', cart });
});

module.exports = router; 