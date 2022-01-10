const { CartModel } = require('../Models/cart.model')
const findCartById= async (req, res, next) => {
  try {
    let {userId}=req.userId
    const findCart = await CartModel.findOne({userId})
    if (!findCart) {
      //if cart is not found it is created and added to request to consume later
      console.log('3')
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
    let cartItems;
    const cart = req.cart;
    const { productId, flag } = req.body;
    if (flag === 'INC') {
      cartItems = cart.products.find((cartItem) => cartItem.product.equals(productId));
      cartItems = cartItems.quantity++
    } else if (flag === 'DEC') {
      cartItems = cart.products.find((cartItem) => cartItem.product.equals(productId));
      cartItems = cartItems.quantity--
    } else if (flag === 'DELETE') {
      cart.products = await cart.products.filter((prod) => !prod.product.equals(productId))
    } else {
      cartItems = await cart.products.push({ product: productId, quantity: 1 });
    }
    cartItems = await cart.save();
    const { products } = await cart.populate('products.product');
    res.json({ response: true, cartItems: products })
  }
  catch (error) {
    res.status(500).json({ response: false, message: `Something happened,${error}` })
  }
}

module.exports = {findCartById, cartController }