const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const offer = require("../schemas/offerSchema");
const jwt = require("jsonwebtoken")
// const secret = "zxcvbnmasdfgthjklo";
// const 

const getUser = (token)=> {
    return new Promise((resolve, reject)=> {
        if(token) {
            let userData
            try {
                userData = jwt.verify(token, SECRET_CODE);
                resolve(userData);
            } catch(err) {
                reject("Invalid Token!")
            }
        } else {
            reject("Token not found")
        }
    })
}

router.post("/create", async(req,res)=> {
    //find the user
    console.log(req.headers.authorization)
    getUser(req.headers.authorization).then((user)=> {
        ///create a offer based on user
        offer.create({...req.body, username: user.username}).then((offer)=> {
            res.status(200).send(offer);
        }).catch((err)=> {
            res.status(400).send({message: err.message})
        })
        //res.status(200).send(user)
    }).catch((err)=> {
        res.status(400).send(err)
    })
});

module.exports = router