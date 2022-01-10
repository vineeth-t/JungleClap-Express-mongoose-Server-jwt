const mongoose= require('mongoose')

const CartSchema= new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,ref:'user'
  },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },quantity:Number }]
})

const CartModel = new mongoose.model('cart',CartSchema)

module.exports={CartModel}

