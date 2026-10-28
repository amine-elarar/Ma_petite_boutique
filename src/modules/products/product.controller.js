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

const  createProducts = async(request , response) =>
{
    try {

        const dataProduct = request.body;
        const  newProduct = await Product.create(dataProduct);
        response.status(201).json({ success: true, data: newProduct});

    } catch (error) {
        console.error(error);

        response.status(400).json({
            
            success: false,
            message: "not valid",
            error: error.message
        }); 
        
    }   
    
}
const getProductById = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        res.status(200).json({ success: true, message: "Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {getProducts ,createProducts ,getProductById , deleteProduct };