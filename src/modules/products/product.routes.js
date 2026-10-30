const express = require('express');
const { getProducts, createProducts, getProductById, deleteProduct, updateProduct } = require('./product.controller.js');
const { authMiddleware, isSeller } = require('../auth/auth.middleware.js');

const productRoutes = express.Router();

productRoutes.get('/products', getProducts);
productRoutes.get('/products/:id', getProductById);
productRoutes.post('/products', authMiddleware, isSeller, createProducts);
productRoutes.delete('/products/:id', authMiddleware, isSeller, deleteProduct);
productRoutes.put('/products/:id', authMiddleware, isSeller, updateProduct);

module.exports = productRoutes;