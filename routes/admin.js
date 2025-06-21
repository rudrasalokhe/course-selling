const {Router, response} = require('express');
const { model } = require('mongoose');
const { adminModel } = require('../db');
const jwt = require('jsonwebtoken');
const adminRouter = Router();
const {JWT_ADMIN_PASSWORD} = require('../config.js');
const {adminMiddleware} = require('../middleware/admin.js');
const {courseModel} = require('../db.js');
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
adminRouter.post('/course',adminMiddleware, async (req, res)=>{
    try{
        const adminId = req.body;
        const {courseName, description, imageUrl} =  req.body;
        const course = await courseModel.create({
            title: String,
            description: String,
            price: Number,
            imageUrl: String,
            creatorId: ObjectId
        })
        res.json({
            message : "Course added",
            courseId : course._id
        })
    }
    catch(e){
        console.log("error while adding course", e);
    }
})
adminRouter.put('/course', adminMiddleware, async (req, res)=>{
    const adminId = req.userId;
     const {title, description, imageUrl, price, courseId } = req.body;
     const updated = await courseModel.updateOne({
        _id : courseId, 
        creatorId : adminId
     },
      {
        title :  title, 
        description :  description, 
        imageUrl : imageUrl, 
        price : price
      }
    )
    res.json({
        message :  "course updated", 
        courseId : updated._id
    })
})
adminRouter.get('/course/bulk',adminMiddleware, async (req,res)=>{
    const adminId = req.body;
    const courses = await courseModel.find({
        creatorId :  ObjectId
    });
    res.json({
        message : "Course updated",
        courses
    })
})

module.exports = adminRouter;