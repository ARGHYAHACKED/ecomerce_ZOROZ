// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET route to retrieve all products from the database
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST route to add a new product to the database
router.post('/products', async (req, res) => {
    const { name, price, image, description } = req.body;

    const newProduct = new Product({
        name,
        price,
        image,
        description
    });

    try {
        const savedProduct = await newProduct.save(); // Save the product to MongoDB
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
