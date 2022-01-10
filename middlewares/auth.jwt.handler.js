const authSecret = process.env['secret'];
const jwt=require('jsonwebtoken')

const authHeaderValidator=async(req,res,next)=>{
  try{
  const token=req.headers.authorization;
  const decoded=jwt.verify(token,authSecret);
  req.userId={userId:decoded.userId}
  next()
  }catch(error){
    console.log('not reached',error)
    res.status(401).json({response:false,message:'Authentication Failed'})
  }
 
}

const jwtToken=(userId)=>{
const token=jwt.sign({userId:userId},authSecret)
return token
}
module.exports={authHeaderValidator,jwtToken}