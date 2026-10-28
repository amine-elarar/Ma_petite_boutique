const mongoose = require('mongoose');
const  Product  = require('./product.model.js');


const  getProducts =  async(request, response)=> 
{
     try {
        const products = await Product.find();
        console.log(products);
         response.status(200).json(products);
        
     } catch (error) {
        
     }  
}

module.exports = {getProducts};