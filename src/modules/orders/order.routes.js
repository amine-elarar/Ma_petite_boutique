const express = require('express');
const { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus } = require('./order.controller.js');
const { authMiddleware, isSeller, isCustomer } = require('../auth/auth.middleware.js');

const route = express.Router();

route.post('/orders', authMiddleware, isCustomer, createOrder);
route.get('/orders/me', authMiddleware, isCustomer, getMyOrders);
route.get('/orders', authMiddleware, isSeller, getAllOrders);
route.get('/orders/:id', authMiddleware, getOrderById);
route.patch('/orders/:id/status', authMiddleware, isSeller, updateOrderStatus);

module.exports = route;
