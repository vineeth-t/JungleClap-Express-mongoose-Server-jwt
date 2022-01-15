const { CartModel } = require('../Models/cart.model')
const findCartById = async (req, res, next) => {
  try {
    let { userId } = req.userId
    const findCart = await CartModel.findOne({ userId })
    if (!findCart) {
      //if cart is not found it is created and added to request to consume later
      let cart = await CartModel({ userId: userId, products: [] })
      cart = await cart.save();
      req.cart = cart
    } else {

      req.cart = findCart
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ response: false, message: `Something happened,${error}` })
  }

}

const cartController = async (req, res) => {
  try {
    let cartItems, temp;
    const cart = req.cart;
    const { productId, flag } = req.body;
    if (flag === 'INC') {
      cartItems = cart.products.find((cartItem) => cartItem.product.equals(productId));
      temp = cartItems.quantity++
    } else if (flag === 'DEC') {
      cartItems = cart.products.find((cartItem) => cartItem.product.equals(productId));
      if (cartItems.quantity <= 1 ) {
        cart.products = await cart.products.filter((prod) => !prod.product.equals(productId))
      } else {
        temp = cartItems.quantity--
      }
    } else if (flag === 'DELETE') {
      cart.products = await cart.products.filter((prod) => !prod.product.equals(productId))
    } else {
     temp = await cart.products.push({ product: productId, quantity: 1 });
    }
    temp = await cart.save();
    const { products } = await cart.populate('products.product');
    res.json({ response: true, cartItems: products })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ response: false, message: `Something happened,${error}` })
  }
}

module.exports = { findCartById, cartController }