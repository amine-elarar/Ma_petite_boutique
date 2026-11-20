const express = require('express');
require('dotenv').config();
require('./config/database.js');

const productRoutes = require('./modules/products/product.routes.js');
const authRoutes = require('./modules/auth/auth.routes.js');
const orderRoutes = require('./modules/orders/order.routes.js');
const notFound = require('./middleware/notFound.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();
app.use(express.json());

app.get('/api/health', (request, response) => {
  response.status(200).json({ status: 'ok', success: true });
});

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
