//This is test data

const faker = require('faker');
const { v4: uuid } = require("uuid");
let products=[];
let cart=[];
let wishList=[]
for(let i=0;i<50;i++){
          name= faker.commerce.productName()
          image= faker.random.image(),
          price= faker.commerce.price(),
          inStock=faker.datatype.boolean(),
          fastDelivery= faker.datatype.boolean()
    product={name,image,price,inStock,fastDelivery}
    products=[...products,product]
  };
module.exports={products,cart,wishList}
