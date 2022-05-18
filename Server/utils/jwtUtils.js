const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET_KEY = "$2y$10$.POx/LMcOAiHUj6wTzpMvedfLGdh9SxK5GcobHzWHghcBZgO6HKZu";

module.exports = {
    generateTokenForUser:function(userData) {
            return jwt.sign(
            {
             UserId:userData.id,
             attachment:userData.attachment
            },
            JWT_SIGN_SECRET_KEY,
            {
                expiresIn:'0.167h'
            }
         );
         
    },
    getJWTSK:()=>{
        return JWT_SIGN_SECRET_KEY;
    }
}