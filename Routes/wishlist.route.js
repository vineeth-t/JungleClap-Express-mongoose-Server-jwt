const express = require('express')

const router = express.Router();

const bodyParser = require('body-parser')

const{addRemoveFromWishlist,wishListContoller,getWishListItems}=require('../Controller/wishlist.controller')

router.use(bodyParser.json())


router.route('/')
  .get(wishListContoller,getWishListItems)
  .post(wishListContoller,addRemoveFromWishlist)

module.exports = router