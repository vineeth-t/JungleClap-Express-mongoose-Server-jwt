const express = require('express')

const router = express.Router();

var bodyParser = require('body-parser')

const { ProductModel } = require('../Models/product.model')

router.use(bodyParser.json())
router.route('/')
  .get(async (req, res) => {
    const productsFromDb = await ProductModel.find({})
    res.json({ products: productsFromDb, response: true })
  })
  .post(async (req, res) => {
    try {
      const NewProduct = await ProductModel.insertMany(products);
      res.json({ response: true, products: NewProduct })
    } catch (error) {
      console.log(error);
      res.json({ response: false })
    }
  })

module.exports = router