const mongoose = require('mongoose');
require('dotenv').config();

const  connet = mongoose.connect(process.env.URL_mongo)
.then(()=> console.log("success"))
.catch(()=>  console.log("not success"));

module.exports = connet;