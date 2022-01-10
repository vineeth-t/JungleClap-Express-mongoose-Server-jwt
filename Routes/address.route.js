const express = require('express')
const router = express.Router()
const { AddressModel } = require('../Models/address.model')

const bodyParser=require('body-parser')

router.use(bodyParser.json())

const addressController = async (req, res, next) => {
  try {
    const { userId } = req.userId
    const findAddress = await AddressModel.findOne({userId})
    if (!findAddress) {
      let newAddressHolder = await AddressModel({
        userId: userId,
        addresses: [ {
            name: 'Alex Carey',
            houseNo: "4-46",
            streetName: "sree ram nagar ",
            landmark: "vartha office",
            city: "khammam",
            district: "khammmam",
            pincode: 507101
        }]
      })
      newAddressHolder = await newAddressHolder.save()
      req.addressHolder = newAddressHolder
    } else {
      req.addressHolder = findAddress
    }
    next()
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ response: false, message: 'Something went wrong' })
  }
}

router.route('/')

  .get(addressController, async (req, res) => {
    const { userId, addressHolder } = req
    const {addresses}=addressHolder
    res.json({ response: true, addresses })
  })

  .post(addressController, async (req, res) => {
      let { addressHolder } = req
      const newAddress=req.body
      let {addresses}=addressHolder
      addresses=addresses.push(newAddress)
      addressHolder=await addressHolder.save()
      res.json({ response: true, addresses:addressHolder.addresses })

  })
router.route('/:id')
  .delete(addressController, async (req, res) => {
      let { addressHolder } = req
      let {id}=req.params
      addressHolder.addresses=addressHolder.addresses.filter((newAddress)=>!newAddress._id.equals(id))
      addressHolder=await addressHolder.save()
      console.log(addressHolder)
      res.json({ response: true, addresses:addressHolder.addresses })

  })

module.exports = router
