const  express = require('express');
const  {getProducts ,createProducts , getProductById} = require('./product.controller.js');
const route = express.Router();



route.get('/products',getProducts );
route.post('/products', createProducts);
route.get('/products/:id', getProductById);
module.exports = route;
