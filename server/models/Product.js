// backend/models/Product.js

const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    image: {
        type: String, // Use Buffer if storing image data directly
        // required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the model
module.exports = mongoose.model('Product', productSchema);
