const express = require("express");
const {userModel} = require("../models/user");
const userRouter = express.Router();
const brypt = require("bcrypt");
const jwt = require("jsonwebtoken");


userRouter.post("/register",async (req,res)=>{
    let {name,email,gender,password,age,city} = req.body;
    try{
        brypt.hash(password,5,async (err,hash)=>{
            if(err){
                res.send({"msg":err.message})
            }else{
                const data = new userModel({name,email,gender,password:hash,age,city})
                await data.save();
                res.send({"msg":"user added successfully"})
            }

        })

    }catch(err){
        res.send({"msg":err.message})

    }

    

})

userRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.find({email});
        if(user.length!==0){
            brypt.compare(password,user[0].password,async(err,result) =>{
                if(result){
                    let token = jwt.sign({userid:user[0]._id},"masai");
                    res.send({"msg":"user added successfully","token":token})
                }else{
                    res.send({"msg":"something is wrong"})
                }
            })
        }

    }catch(err){
        res.send({"msg":err.message})

    }

})


module.exports = {
    userRouter
}