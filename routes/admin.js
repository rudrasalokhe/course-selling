const {Router, response} = require('express');
const { model } = require('mongoose');
const { adminModel } = require('../db');
const jwt = require('jsonwebtoken');
const adminRouter = Router();
const {JWT_ADMIN_PASSWORD} = require('../config.js');

adminRouter.post('/signup', async (req, res)=>{
    try{
        const {email, password, firstName, lastName} = req.body;
        
        await adminModel.create({
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
})
adminRouter.post('/signin', async (req,res)=>{
    try{
        const {email, password} =  req.body;
        const user = await adminModel.findOne({
                email : email, 
                password : password
            })
            if(user){
                const token =  jwt.sign({
                    id: user._id
                }, JWT_ADMIN_PASSWORD);
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
                res.status(500).json({ message: "Internal server error", error: error.message });
            }
})

adminRouter.post('/course', (req, res)=>{
    res.json({
        message :  "all courses"
    })
})
adminRouter.put('/course', (req, res)=>{
    res.json({
        message : "add courses"
    })
})
adminRouter.get('/course/bulk', (req,res)=>{
    res.json({
        message : "something"
    })
})

module.exports = adminRouter;