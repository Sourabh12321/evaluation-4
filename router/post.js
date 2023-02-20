const express = require("express");
const {postModel} = require("../models/post");
const { userModel } = require("../models/user");
const postRouter = express.Router();

postRouter.get("/",async (req,res)=>{
    try{
        const posts = await postModel.find();
        res.send(posts)

    }catch(err){
        res.send({"msg":err.message})
    }
    
})
postRouter.post("/addposts",async (req,res)=>{
    try{
        const payload = req.body;
        const posts = new postModel(payload);
        await posts.save();
        res.send({"msg":"post is saved"})

    }catch(err){
        res.send({"msg":err.message})

    }

})

postRouter.patch("/update/:id",async (req,res)=>{
    const payload = req.body;
    const id = req.params.id;
    const post = await postModel.find({_id:id});
    const userid = post.userid;
    const userid_req = req.body.userid;
    try{
        if(userid!==userid_req){
            res.send({"msg":"you are not the authorized person"})
        }else{
            await userModel.findByIdAndUpdate({_id:id},payload);
            res.send({"msg":"updated successfully"})
        }

    }catch(err){
        res.send({"msg":err.message})

    }
})

postRouter.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id;
    const post = await postModel.find({_id:id});
    const userid = post.userid;
    const userid_req = req.body.userid;
    try{
        if(userid!==userid_req){
            res.send({"msg":"you are not the authorized person"})
        }else{
            await userModel.findByIdAndDelete({_id:id});
            res.send({"msg":"deleted successfully"})
        }

    }catch(err){
        res.send({"msg":err.message})

    }
})


module.exports = {
    postRouter
}