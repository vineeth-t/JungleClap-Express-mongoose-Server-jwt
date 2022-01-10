
const { WishListModel } = require('../Models/wishlist.model')

const wishListContoller = async (req, res, next) => {
  try {
     let {userId}=req.userId;
    const findWishList = await WishListModel.findOne({ userId: userId })
   
    if (!findWishList) {
      //if wishlist is not found it is created and added to request to consume later
      let wishList = await WishListModel({ userId: userId, products: [] })
      wishList = await wishList.save()
      req.wishList = wishList
    } else {
      req.wishList = findWishList
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ response: false, message: `Something happened,${error}` })
  }
}

const addRemoveFromWishlist = async (req, res) => {
  try {
    //Accessed the wishlist and pushed the productId into wishlist 
    let { wishList } = req
    const { productId } = req.body;

    if (wishList.products.find((prod) => prod.product.equals(productId))) {
      wishList.products = await wishList.products.filter((pro) => !pro.product.equals(productId))
    } else {
      wishlistItems = await wishList.products.push({ product: productId })
    }

    wishlistItems = await wishList.save();

    const { products } = await wishList.populate("products.product")

    res.json({ response: true, wishlistItems: products })

  } catch (error) {
    console.log(error)
    res.status(500).json({ response: false, message: `Something happened,${error}` })
  }

}

const getWishListItems = async (req, res) => {
  try {
    let { wishList } = req
    const { products } = await wishList.populate("products.product")
    res.json({ response: true, wishlistItems: products })
  } catch (error) {
    console.log(error)
    res.status(500).json({ response: false, message: `Something happened,${error}` })
  }

}
module.exports = { addRemoveFromWishlist, wishListContoller, getWishListItems }