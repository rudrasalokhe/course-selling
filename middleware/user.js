const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require('../config.js');
function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);
    if(decoded){
        req.userId = decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message : "you are not signed in bhai."
        })
    }
}
module.exports = {
    userMiddleware : userMiddleware
}