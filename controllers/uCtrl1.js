const jwt = require("../config/jwt")
const pro = require('../models/programs')
const ses = require('../models/session')
const work = require('../models/work')
const exer = require("../models/exercise")

module.exports = {
    program_get: function(req, res, next) {
        const token = req.cookies["Token"]
        const cookie = req.cookies["Programme"]
        pro.allPrograms(jwt.idAccountToken(token), function(resDB){
            if(resDB==0){
                res.render('error',{title: "Erreur", error: "", message:"Problème de connexion"})
            }
                else{
            res.render('users/program', {title: "Mes programmes", resDB, msg:cookie});
                }
        })
    },

    addProgram_post: function (req, res, next) {
        const token = req.cookies["Token"]
        pro.programCount(jwt.idAccountToken(token), function(resDB){
            if(resDB==0){
                res.render('error',{title: "Erreur", error: "", message:"Problème de connexion"})
            }
                else{
            if(resDB[0].count>=15){
                res.cookie('Programme',["Impossible d'ajouter un programme (maximum 15)",1],{maxAge:5*1000})
                res.status(400).redirect('/program');
            }
            else{
                pro.create(req.body, jwt.idAccountToken(token), function(resDB){
                    if(resDB==0){
                        res.render('error',{title: "Erreur", error: "", message:"Problème de connexion"})
                    }
                        else{
                    res.cookie('Programme',["Ajout d'un programme avec succès",2],{maxAge:5*1000})
                    res.redirect('/program');
                        }
                })
            }
        }
        })

    },

    deleteProgram_get: function (req, res, next) {

              const token = req.cookies["Token"]
              pro.programAcces(jwt.idAccountToken(token),req.params.id, function(resDB){ //Vérifie si on a accès
                  if(resDB[0] ==undefined){
                    if(resDB==0){
                        res.render('error',{title: "Erreur", error: "", message:"Problème de connexion"})
                    }
                        else{
                      res.cookie('Programme',["Vous n'avez pas les droits",1],{maxAge:5*1000})
                      res.status(403).redirect("/program")}
                        }
                  else{
                 pro.delete(req.params.id, function(resDB2){
                    if(resDB==0){
                        res.render('error',{title: "Erreur", error: "", message:"Problème de connexion"})
                    }
                        else{
                    res.cookie('Programme',["Suppression d'un programme avec succès",2],{maxAge:5*1000})
                    res.redirect('/program');
                        }
                })
            }
        })
                 

            
       //})
    },
    session_get: function(req, res, next) {
        const token = req.cookies["Token"]
        const cookie = req.cookies["Session"]
            pro.programAcces(jwt.idAccountToken(token),req.params.id, function(resDB){ //Vérifie si on a accès au programme
                if(resDB[0] ==undefined){
                    res.cookie('Programme',["Vous n'avez pas accès à ce programme",1],{maxAge:5*1000})
                    res.status(403).redirect("/program")}
                else{
                    pro.aProgram(req.params.id, function(resDB1){
                        ses.allSessions(req.params.id, function(resDB2){
                            if(resDB1==0 || resDB2==0){
                                res.render('error',{title: "Erreur", error: "", message:"Problème de connexion"})
                            }
                                else{
                            var tabCount = []
                            for(let pas = 0; pas < resDB2.length; pas++){
                                ses.count(resDB2[pas].IDSeance, function(resDB3){
                                    tabCount[pas]=resDB3[0]
                                    
                                })
                            }
                            res.render('users/session', {title: "Mes séances", msg:cookie, resDB1, tabCount, resDB2});
                        }
                        })
            })
            }
          })
    },
    addSession_post: function (req, res, next) {
        //On est forcément login ici
        ses.sessionCount(req.params.id, function(resDB){
            if(resDB[0].count>=12){
                res.cookie('Session',["Impossible d'ajouter une séance (maximum 12)",1],{maxAge:5*1000})
                res.status(400).redirect('/program/'+req.params.id);
            }
            else{

        ses.create(req.body, req.params.id, function(resDB){
            res.cookie('Session',["Ajout d'une séance avec succès",2],{maxAge:5*1000})
            res.redirect('back');
            })
          }
        })
    }

          ,

    deleteSession_get: function (req, res, next) {
        const token = req.cookies["Token"]
            ses.sessionAcces(jwt.idAccountToken(token),req.params.id2, function(resDB){ //Vérifie si on a accès au programme
                if(resDB[0] ==undefined){
                    res.cookie('Programme',["Vous n'avez pas les droits",1],{maxAge:5*1000})
                    res.status(403).redirect("/program")}
                else{

                  ses.deleteByIdSession(req.params.id2, function(resDB){
                    res.cookie('Session',["Suppression d'une séance avec succès",2],{maxAge:5*1000})
                    res.redirect('/program/'+req.params.id1);
                  })
                }
                })
          },
          work_get: function(req, res, next) {
            const cookie = req.cookies["Work"]
            const token = req.cookies["Token"]
            ses.sessionAcces(jwt.idAccountToken(token),req.params.id, function(resDB){ //Vérifie si on a accès au programme
                if(resDB[0] ==undefined){
                    res.cookie('Programme',["Vous n'avez pas accès à cette séance",1],{maxAge:5*1000})
                    res.status(403).redirect("/program")}
                else{
                ses.aSession(req.params.id, function(resDB1){
                    exer.allExercises(function(resDB2){
                        work.allExercises(req.params.id, function(resDB3){
                            res.render('users/work',{title: "Mes exercices",msg:cookie, resDB1, resDB2, resDB3})
                        })
                    })
              })
            }
        })
    },    
    work_post: function (req, res, next) {
        //On est forcément login ici

        work.workCount(req.params.id, function(resDB){
            if(resDB[0].count>=16){
                res.cookie('Work',["Impossible d'ajouter un exercice (maximum 16)",1],{maxAge:5*1000})
                res.status(400).redirect('/program/session/'+req.params.id);
            }
            else{

        exer.selectIdByName(req.body.exercice, function(resDB1){
        var idEx =resDB1;
        console.log(idEx)
        work.create(req.body, req.params.id, idEx, function(resDB2){
            res.cookie('Work',["Ajout d'un exercice avec succès",2],{maxAge:5*1000})
            res.redirect('back');
            })
        })
    }
})
    },
    deleteWork_get: function (req, res, next) {

        const token = req.cookies["Token"]
        ses.sessionAcces(jwt.idAccountToken(token),req.params.id2, function(resDB){ //Vérifie si on a accès
            if(resDB[0] ==undefined){
                res.cookie('Programme',["Vous n'avez pas les droits",1],{maxAge:5*1000})
                res.status(403).redirect("/program")}
            else{
        var sess= req.params.id1
              work.deleteByIdWork(req.params.id1, req.params.id2, req.params.id3, function(resDB){
                res.cookie('Work',["Suppression d'un exercice avec succès",2],{maxAge:5*1000})
                res.redirect('/program/session/'+sess);
                
              })
            }
        })
    }
      ,
}
    