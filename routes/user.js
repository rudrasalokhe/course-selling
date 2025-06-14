const express = require('express');
const router = express.Router();
const {userModel} = require('../db.js');
const jwt = require('jsonwebtoken');
const JWT_USER_PASSWORD = "tanvigoeslalalla";
router.post('/signup', async (req, res) => {
        try{
        const {email, password, firstName, lastName} = req.body;
        await userModel.create({
            email: email, 
            password : password, 
            firstName : firstName,
            lastName : lastName
        })
        res.json({ message: "Signup successful" });
        } 
        catch(e){
            console.log("error during signup",e);
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
        });

router.post('/signin', async (req, res) => {
    try{
        const {email, password} =  req.body;
        const user = await userModel.findOne({
                email : email, 
                password : password
            })
            if(user){
               const token =  jwt.sign({
                    id: user._id
                }, JWT_USER_PASSWORD);
                res.json({
                    token : token
                })
            }
            else{
                res.status(403).json({
                    message : "Incorrect credentials"
                })
            }

        }
        catch(e){
            console.log("error loginin", e);
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
        });
router.post('/purchase', (req,res)=>{

})
module.exports = router;