const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  },
  addresses: [ {
      name: String,
      houseNo: String,
      streetName: String,
      landmark: String,
      city: String,
      district: String,
      pincode: Number
  }]

})
const AddressModel = new mongoose.model('address', AddressSchema)

module.exports = { AddressModel }
