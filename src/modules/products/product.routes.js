const  express = require('express');
const  {getProducts} = require('./product.controller.js');
const route = express.Router();



route.get('/products',getProducts );

module.exports = route;
