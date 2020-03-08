// Imports
var jwt = require('jsonwebtoken');

const JWT_KEY = '56697665204e6f64654a73';
const jwtExpSec = 604800

// Exported functions
module.exports = {
  // Return Token for user
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData,
    },
        JWT_KEY,
    {
      expiresIn: jwtExpSec
    })
},
    // Return true if it's the token is ok
    verifToken: function(token){
        if (!token) {
            console.log("Token n'existe pas")
            return false
          }
        var payload
        try {
          payload = jwt.verify(token, JWT_KEY)
        } catch (e) {
          if (e instanceof jwt.JsonWebTokenError) {
            return false
          }
          return false
        }
        return true
    }
    ,
    // Return id of user of the token in arg 
    idAccountToken: function(token){
        if (!token) {
            console.log("Token n'existe pas")
            return undefined
          }
        var payload
        try {
          payload = jwt.verify(token, JWT_KEY)
        } catch (e) {
          if (e instanceof jwt.JsonWebTokenError) {
            return undefined
          }
          return undefined
        }
        return payload.userId
    }
}