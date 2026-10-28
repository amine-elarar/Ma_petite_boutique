require('dotenv').config();

const  mongoose  = require('mongoose');
require('../config/database.js');
const Product  = require("../modules/products/product.model.js");

const productsList = [
            { name: "Casque Bluetooth", description: "Sans fil", priceCents: 4500, available: true },
            { name: "Clavier Mécanique", description: "RGB", priceCents: 6500, available: true },
            { name: "Souris Gamer", description: "Optique", priceCents: 2500, available: true },
            { name: "Tapis de souris", priceCents: 1000, available: true },
            { name: "Écran 24 pouces", description: "Rupture de stock", priceCents: 15000, available: false } // هادا لي طلبو يكون غير متوفر
        ];

const   insertProducts  = async () => 
{
    try {

        await  Product.deleteMany();

        await Product.insertMany(productsList);
        console.log("test");
        process.exit();

        
        
    } catch (error)
    {
        console.error(error)
        
    }
}
insertProducts();
