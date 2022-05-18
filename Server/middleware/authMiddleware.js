const jwt = require('jsonwebtoken');
const jwtUtils = require('../utils/jwtUtils')

const JWT_SIGN_SECRET_KEY = jwtUtils.getJWTSK();
module.exports = (req,res,next)=>{
    var headerAuth = req.headers['authorization'];
    if(!headerAuth){
        res.status(401).json({error:'Not authentificated'})
    }
    const token = headerAuth.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token,JWT_SIGN_SECRET_KEY);
    } catch (err) {
        if (err.name=="JsonWebTokenError") {
            res.status(500).json({error:err.message})
        }
        if (err.name=="TokenExpiredError") {
            res.status(500).json({error:err.message})
        }
    }
    console.log(decodedToken);
    if (!decodedToken) {
        res.status(401).json({error:'Not authentificated'})
    }
    req.isLoggedIn = true;
    req.UserId = decodedToken.UserId;
    next();
}