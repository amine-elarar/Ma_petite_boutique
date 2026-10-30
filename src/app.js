const express = require('express');
require('dotenv').config();
require('./config/database.js');

const productRoutes = require('./modules/products/product.routes.js');
const authRoutes = require('./modules/auth/auth.routes.js');

const app = express();

app.use(express.json());

app.get('/api/health', (request, response) => { 
    response.status(200).json({ success: true, message: "hi endpoint" });
});

app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;