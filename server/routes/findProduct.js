// routes/findProduct.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust the path as necessary

// Route to get product details by ID
router.get('/:id', async (req, res) => {
    console.log('Fetching product with ID:', req.params.id); // Debug log
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
