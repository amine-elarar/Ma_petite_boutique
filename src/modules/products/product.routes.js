const  express = require('express');
const  {getProducts ,createProducts , getProductById , deleteProduct} = require('./product.controller.js');

const { authMiddleware, isSeller } = require('../auth/auth.middleware.js');
const route = express.Router();



route.get('/products',getProducts );
route.get('/products/:id', getProductById);

route.post('/products',  authMiddleware, isSeller,createProducts);
route.delete('/products/:id',authMiddleware , isSeller, deleteProduct);
module.exports = route;
