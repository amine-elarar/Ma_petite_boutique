
const express  = require('express')
require('dotenv').config();
require('./config/database.js');
const routes = require('./modules/products/product.routes.js');



const app =  express();
app.use(express.json());
app.use(routes);

app.get('/api/health', (request, response) => { response.status(200).json({success:true, message:" hi endpiont"})})


app.use('/api',routes);

module.exports = app ;