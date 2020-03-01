const jwt = require("../config/jwt")
const pro = require('../models/programs')
const ses = require('../models/session')
const work = require('../models/work')
const exer = require("../models/exercise")

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
    },
    addProgram_post: function (req, res, next) {
        const token = req.cookies["Token"]
        /*if(!jwt.verifToken(token)){
                res.redirect('/login')
            }
        else{ //Token OK
*/
            pro.create(req.body, jwt.idAccountToken(token), function(resDB){
            res.redirect('/program');
            })
    },
    deleteProgram_get: function (req, res, next) {
        /*const token = req.cookies["Token"]
        if(!jwt.verifToken(token)){
                res.redirect('/login')
            }
        else{ //Token OK
*/
            pro.delete(req.params.id, function(resDB){
            res.redirect('/program');
            })
    },
    session_get: function(req, res, next) {
        const token = req.cookies["Token"]
        if(!jwt.verifToken(token)){
                res.redirect('/login')
        }
        else { //Token OK
            pro.programAcces(jwt.idAccountToken(token),req.params.id, function(resDB){ //Vérifie si on a accès au programme
                if(resDB[0] ==undefined){res.redirect("/program")}
                else{
                    pro.aProgram(req.params.id, function(resDB1){
                        ses.allSessions(req.params.id, function(resDB2){
                            console.log("OK")
                            var tabCount = []
                            for(let pas = 0; pas < resDB2.length; pas++){
                                ses.count(resDB2[pas].IDSeance, function(resDB3){
                                    tabCount[pas]=resDB3[0]
                                    console.log(tabCount)
                                })
                                console.log("CECI DOIT S AFFICHER APRES")
                            }
                          


                            res.render('users/session', {resDB1, resDB2});
                        })
            })
            }
          })
        }
    },
    addSession_post: function (req, res, next) {
        //On est forcément login ici
        ses.create(req.body, req.params.id, function(resDB){
            res.redirect('back');
            })
          },

    deleteSession_get: function (req, res, next) {
            var prog= req.params.id1
                  ses.deleteByIdSession(req.params.id2, function(resDB){
                    res.redirect('/program/'+prog);
                  })
          },
          work_get: function(req, res, next) {
            const token = req.cookies["Token"]
            if(!jwt.verifToken(token)){
                    res.redirect('/login')
                }
            else{ //Token OK
                ses.aSession(req.params.id, function(resDB1){
                    exer.allExercises(function(resDB2){
                        work.allExercises(req.params.id, function(resDB3){
                            res.render('users/work',{resDB1, resDB2, resDB3})
                        })
                    })
              })
        }
    },    
        work_post: function (req, res, next) {
        //On est forcément login ici
        exer.selectIdByName(req.body.exercice, function(resDB1){
        var idEx =resDB1;
        console.log(idEx)
        work.create(req.body, req.params.id, idEx, function(resDB2){
            res.redirect('back');
            })
        })
    }
}
    