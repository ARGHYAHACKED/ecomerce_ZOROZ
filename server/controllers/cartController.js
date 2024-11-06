// backend/routes/CartRoutes.js

const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/Product');
const router = express.Router();

// POST route to add a product to the cart
router.post('/add', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne();

        if (cart) {
            // Update existing cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // If product exists in the cart, update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // If product does not exist in cart, add new item
                cart.items.push({ productId, quantity });
            }

            cart = await cart.save();
            res.status(200).json(cart);
        } else {
            // If no cart exists, create a new one
            const newCart = await Cart.create({
                items: [{ productId, quantity }]
            });
            res.status(201).json(newCart);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET route to fetch cart items
router.get('/', async (req, res) => {
    try {
        const cart = await Cart.find().populate('items.productId'); // Make sure to populate the product details
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT route to reduce quantity of an item in the cart
router.put('/reduce-quantity', async (req, res) => {
    const { itemId } = req.body;

    try {
        // Find the cart that contains the item
        const cart = await Cart.findOne({ "items._id": itemId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart or item not found' });
        }

        const item = cart.items.id(itemId);

        // Reduce the quantity
        item.quantity -= 1;

        // If the quantity is zero, remove the item
        if (item.quantity <= 0) {
            item.remove();
        }

        // Save the cart
        await cart.save();

        res.json({ message: 'Quantity reduced successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
