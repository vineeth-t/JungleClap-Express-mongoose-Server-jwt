const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const port = 3000;
//After setting up database use this 
const InitialiseDataBase= require('./DataBase/database.connect')
InitialiseDataBase();

const products=require('./Routes/products.route.js')

const wishlist=require('./Routes/wishlist.route.js')

const cart=require('./Routes/cart.route.js');

const signUp=require('./Routes/signUp.route.js');

const logIn=require('./Routes/login.route.js');

const users=require('./Routes/users.route.js')

const addresses=require('./Routes/address.route.js')


const {routeNotFound}=require('./middlewares/route-not-found')
const {errorHandler}=require('./middlewares/errorHandler.route.js')

const {authHeaderValidator}=require('./middlewares/auth.jwt.handler.js')

app.use("/products",products)
app.use('/signUp',signUp)
app.use('/login',logIn)

app.use(authHeaderValidator)
app.use("/wishlist",wishlist)
app.use('/cart',cart)
app.use('/user',users)
app.use('/address',addresses)




app.get('/', (req, res) => {
  res.send('Hello Express app!')
});


//These two are location specific should be kept at last only
app.use('*',routeNotFound)
app.use(errorHandler)


app.listen( process.env.PORT || port, () => {
    console.log(`server started`)
  })
