const  express = require('express');
const  {getProducts ,createProducts} = require('./product.controller.js');
const route = express.Router();



route.get('/products',getProducts );
route.post('/products', createProducts);
module.exports = route;
