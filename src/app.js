const express  = require('express');
const connect = require('./config/database.js')

const app =  express();



require('dotenv').config();
app.listen(process.env.PORT , () =>  {console.log(`server is runnging ${process.env.PORT}`)});
