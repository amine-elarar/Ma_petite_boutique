const mongoose    = require('mongoose');


const ProductSchema =  new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true
        },
        description:{ 
            type:String
        },
        priceCents:{
            type:Number,
            required:true,
            min:1
        },
        available:{
            type:Boolean,
            default:true
        },
    },
    { timeseries:true}
)
module.exports  =  mongoose.model('Product',ProductSchema);