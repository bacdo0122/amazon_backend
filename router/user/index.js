const express = require("express");
const router = express.Router();
const user = require("../../model/user");

router.get("/", async(req,res)=>{
    
    try {
        const getUser = await user.find({username: req.query.username, password:req.query.password});
        if(!getUser[0]){
            res.json({message: "Username or Password is not valid!"})
        }
        else res.status(200).json(getUser) 
    } catch (error) {
        res.status(400).json({message:error})
    } 
})

router.post("/", async(req,res)=>{
    const newUser = new user({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
         birthday: req.body.birthday,
         IdentifyCard: req.body.IdentifyCard,
    })
    try {
        const getUser = await newUser.save();
         res.status(200).json(getUser) 
    } catch (error) {
        res.status(400).json({message:error})
    } 
}) 

module.exports = router;