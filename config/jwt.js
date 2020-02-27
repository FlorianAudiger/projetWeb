// Imports
var jwt = require('jsonwebtoken');

const JWT_KEY = '56697665204e6f64654a73';
const jwtExpSec = 600

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData,
    },
        JWT_KEY,
    {
      expiresIn: jwtExpSec
    })
},
    verifToken: function(token){
        if (!token) {
            console.log("Token n'existe pas")
            return false
          }
        var payload
        try {
          // Parse the JWT string and store the result in `payload`.
          // Note that we are passing the key in this method as well. This method will throw an error
          // if the token is invalid (if it has expired according to the expiry time we set on sign in),
          // or if the signature does not match
          payload = jwt.verify(token, JWT_KEY)
        } catch (e) {
          if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            //return res.status(401).end()
            return false
          }
          // otherwise, return a bad request error
          //return res.status(400).end()
          return false
        }
      
        // Finally, return the welcome message to the user, along with their
        // username given in the token
        return true
    }
    ,
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
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            //return res.status(401).end()
            return undefined
          }
          // otherwise, return a bad request error
          //return res.status(400).end()
          return undefined
        }
      
        return payload.userId
    }
}