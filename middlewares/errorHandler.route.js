function errorHandler(err,req,res,next){
    console.log(err.stack);
  res.json({success:false,msg:err.message})
}
module.exports={errorHandler}

