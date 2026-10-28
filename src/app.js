
const express  = require('express')
require('dotenv').config();
require('./config/database.js');


const app =  express();


app.get('/api/health', (request, response) => { response.status(200).json({success:true, message:" hi endpiont"})})

module.exports = app ;