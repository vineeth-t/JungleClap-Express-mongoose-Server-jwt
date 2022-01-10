const mongoose = require('mongoose');

const ProductSchema= new mongoose.Schema({
  name:String,
  image:String,
  price:Number,
  inStock:Boolean,
  fastDelivery:Boolean
},{timeStamps:true})

const ProductModel=mongoose.model('product',ProductSchema)

module.exports={ProductModel}

