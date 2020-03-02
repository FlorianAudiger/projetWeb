const jwt = require("./jwt")

const verifyToken = (req, res, next) => {
  const token = req.cookies["Token"]
  if(!jwt.verifToken(token)){
    res.redirect('/login')
  }
  else{
    next();
  }
};

module.exports = verifyToken;