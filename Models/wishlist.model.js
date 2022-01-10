 const mongoose = require('mongoose');

const WishListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' } }]
})

const WishListModel= mongoose.model('Wishlist',WishListSchema)

module.exports={WishListModel}