const express = require("express");
const router = express.Router();
const user = require("../schemas/userSchema");
const jwt = require("jsonwebtoken")
const secret = "zxcvbnmasdfgthjklo";
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");


router.post("/signup",(req,res)=>{
    // console.log(req.body)
    const {name,password,email} = req.body;
    console.log(name,password)
    bcrypt.hash(password, 10, (hashErr, hashValue)=> {
        if(hashErr) {
            res.status(401).send("Unable to process");
        } else {
            user.create({username:name, password: hashValue, email: email}).then((user)=> {
                res.status(200).send(user.username + " " + "created successfully");
            }).catch((err)=> {
                res.status(400).send(err.message)
            })
        }
    })
    // res.send("ok")
})
router.post("/signin",async (req,res)=>{
    const {name,password,email} = req.body;
    user.findOne({username:name}).then((user)=>{
        if(!user){
            res.status(401).send("please signup to login")
        }else{
            if(!bcrypt.compareSync(password,user.password)){
                res.status(401).send("Please enter correct password")
            }else{
                const token = jwt.sign({id:user._id,username:user.name},secret);
                console.log(token)
                res.status(200).send({message:"User Logged in Successfully ",token:token})
            }
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})



module.exports = router