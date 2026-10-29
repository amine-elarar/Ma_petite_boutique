
const express  = require('express')
require('dotenv').config();
require('./config/database.js');
const routes = require('./modules/products/product.routes.js');
const  authRoute = require('./modules/auth/auth.routes.js');


const app =  express();
app.use(express.json());
app.use(routes);
app.use(authRoute);

app.get('/api/health', (request, response) => { response.status(200).json({success:true, message:" hi endpiont"})})


app.use('/api',routes);
app.use('/api/auth',authRoute);

module.exports = app ;