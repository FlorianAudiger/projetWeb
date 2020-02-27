const jwt = require("../config/jwt")

module.exports = {
    program_get: function(req, res, next) {
        const token = req.cookies["Token"]
        console.log(token)

        if(!jwt.verifToken(token)){
                res.redirect('/login')
            }
          else{
            res.render('program');
          }
    }
}