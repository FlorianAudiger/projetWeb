const jwt = require("../config/jwt")
const pro = require('../models/programs')
const ses = require('../models/session')

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
          }
    }

    