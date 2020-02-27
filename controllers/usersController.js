const jwt = require("../config/jwt")
const pro = require('../models/programs')

module.exports = {
    program_get: function(req, res, next) {
        const token = req.cookies["Token"]
        if(!jwt.verifToken(token)){
                res.redirect('/login')
            }
        else{ //Token OK

            
            pro.allPrograms(jwt.idAccountToken(token), function(resDB){
            res.render('users/program', {resDB});
            })
          }
    }
}