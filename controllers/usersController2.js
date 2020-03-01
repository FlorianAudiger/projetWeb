const jwt = require("../config/jwt")
const exer = require('../models/exercise')

module.exports = {
    exercise_get: function(req, res, next) {
        const token = req.cookies["Token"]
        if(!jwt.verifToken(token)){
                res.redirect('/login')
        }
        else{ //Gerer erreur si on cherche dans la barre URL un exo plus loin
            exer.aExercise(req.params.id,jwt.idAccountToken(token), function(resDB){
                exer.aExerciseAllRecord(req.params.id,jwt.idAccountToken(token), function(resDB2){
                    exer.aExerciseAllDate(req.params.id,jwt.idAccountToken(token), function(resDB3){
                        console.log(resDB2[0].PoidsMax)
                        //var a = res.json(resDB2)
                        res.render('users/exercise', {resDB, resDB3});
            })
        })
    })
          }
    },
    allExercises_get: function(req, res, next) {
        const token = req.cookies["Token"]
        if(!jwt.verifToken(token)){
                res.redirect('/login')
            }
        else{ //Token OK
            exer.allExercises(function(resDB){
                res.render('users/allExercise', {resDB});
            })
          }
    
    },
    addRecord_post: function(req, res, next) {
            const token = req.cookies["Token"]
            exer.createRecord(req.body, jwt.idAccountToken(token), req.params.id, function(resDB){
                res.redirect('back');        
        })
    }
}

    