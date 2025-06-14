const {Router} = require('express');
const courseRouter = Router();

courseRouter.post('/purchases', (req,res)=>{
    res.json({
        message : "purchases"
    })
})
courseRouter.get('/purchases', (req,res)=>{
    res.json({
        message : "all the purchased"
    })
})

module.exports = courseRouter;