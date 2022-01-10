const express = require('express');

const router = express.Router();

const { cartController,findCartById } = require('../Controller/cart.controller')

const bodyParser = require('body-parser');

router.use(bodyParser.json())

router.route('/')
  .get(findCartById,async (req, res) => {
    try {
      const cart = req.cart;
      const { products } = await cart.populate('products.product');
      res.json({ response: true, cartItems: products })
    }
    catch (error) {
      res.status(500).json({ response: false, message: `Something happened,${error}` })
    }
  })
  .post(findCartById,cartController)

module.exports = router
