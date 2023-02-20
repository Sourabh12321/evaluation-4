const jwt=require("jsonwebtoken");

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userId=decoded.userId;
                next();
            }else{
                res.send({"msg":"Please Log In First"});
            }
        })
    }else{
        res.send({"msg":"Please Log In First"});
    }
}

module.exports={
    authenticate
}