const mongoose= require('mongoose')
const userName = process.env['dbUserName']
const password = process.env['password']

const InitialiseDataBase=async()=>{
  await mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.rm9xi.mongodb.net/Ecommerce?retryWrites=true&w=majority`,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log('connection started'))
.catch((err)=>console.log(err))
}

module.exports=InitialiseDataBase