const jwt = require("../config/jwt")
const exer = require('../models/exercise')

module.exports = {
    exercise_get: function(req, res, next) {
        const token = req.cookies["Token"]
        if(!jwt.verifToken(token)){
                res.redirect('/login')
            }
        else{ //Token OK

            
            exer.allExercises(function(resDB){
                res.render('users/exercise', {resDB});
            })
          }
    
    }
}

    