const express = require("express");
const {connection} = require("./db");
const {userRouter} = require("./router/user");
const {postRouter} = require("./router/post");
const {authenticate} = require("./middlewares/authentication");
require('dotenv').config()
const cors = require("cors");



const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("home page");
})
app.use(cors());

app.use("/users",userRouter);
app.use(authenticate);
app.use("/post",postRouter);

app.listen(process.env.port,async ()=>{
    try{
        await connection
        console.log("start");

    }catch(err){
        console.log({"msg":err.message});

    }
    
})