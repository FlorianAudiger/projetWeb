//Import
const account = require("../models/account")
const bcrypt = require('bcrypt');
const jwt = require("../config/jwt")

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,16}$/;


module.exports = {
    register_post: function(req, res){
        account.boolMail(req.body, function (resDB) {
          if(resDB!=undefined){
            res.cookie('Register',"L'adresse mail existe déjà",{maxAge:5*1000})
            res.redirect('/register')
          }
          else if (req.body.mail=='' || req.body.pswd[0]== '' || req.body.firstname=='' || req.body.lastname==''){
            res.cookie('Register',"Un des champs est vide",{maxAge:5*1000})
            res.redirect('/register')
          }

          else if (req.body.firstname.length >= 20 || req.body.lastname.length >= 20) {
            res.cookie('Register',"Votre nom dépasse la taille limite",{maxAge:5*1000})
            res.redirect('/register')
          }
          else if(!EMAIL_REGEX.test(req.body.mail)){
            res.cookie('Register',"L'adresse mail ne respecte pas le bon format",{maxAge:5*1000})
            res.redirect('/register')
          }
          else if(!PASSWORD_REGEX.test(req.body.pswd[0])) {
            res.cookie('Register',"Le mot de passe doit contenir au moins 1 chiffre et au moins 4 caractères",{maxAge:5*1000})
            res.redirect('/register')
          }
          else if(req.body.pswd[0]!=req.body.pswd[1]) {
            res.cookie('Register',"Le mot de passe n'est pas identique",{maxAge:5*1000})
            res.redirect('/register')
          }
          else{
            console.log(req.body.pswd[0])
            bcrypt.hash(req.body.pswd[0], 6, function(err, psw){
              req.body.pswd[0]=psw
              account.create(req.body, function(){
                res.cookie('Register',"Votre inscription a eu lieu avec succès",{maxAge:5*1000})
                res.redirect('/register')
            })
        })
      }
      })
      //res.redirect('/register')
    },
    register_get: function(req, res, next) {
      const cookie = req.cookies["Register"]
        res.render('register', {title: "Inscription", error: cookie});
    },
    login_get: function(req, res, next) {
      const cookie = req.cookies["Login"]
        res.render('login', {title: "Connexion", error: cookie});
    },
    index_get: function(req, res, next) {
      res.render('index', {title: "Mon suivi sportif"});
    },
    logout_get:function(req, res, next) {
      res.clearCookie("Token");
      res.redirect('../');
    },

    login_post: function(req, res){
      account.boolMail(req.body, function (resDB) {
        if(resDB!=undefined){ //login ok
          bcrypt.compare(req.body.pswd, resDB.MDP, function(err, resCrypt){
            if(resCrypt){ //pwd ok
              var token = jwt.generateTokenForUser(resDB.IDCompte)
              res.cookie('Token',token,{maxAge:604800*1000})
              res.redirect('/program')
            }
            else{
              res.cookie('Login',"Votre mot de passe est incorrect",{maxAge:5*1000})
              res.redirect('/login')
            }
          })
        }
        else{
          res.cookie('Login',"L'identifiant n'existe pas",{maxAge:5*1000})
          res.redirect('/login')
    }
    })
  },
  setting_get1: function (req, res, next) {
    const token = req.cookies["Token"]
    res.redirect("setting/"+jwt.idAccountToken(token))
  },
  setting_get2: function (req, res, next) {
    const token = req.cookies["Token"]
    const cookie = req.cookies["Setting"]
    if(!jwt.verifToken(token)){
            res.redirect('/login')
    }
    else{
      account.select(req.params.id, function(resDB){
        res.render("users/setting",{title: "Paramètres", resDB, error: cookie})
      })
    }

      
  },    
  setting_post1: function(req, res){
      account.boolMail(req.body, function (resDB) {
      if(resDB!=undefined){
        res.cookie('Setting',"L'adresse mail existe déjà",{maxAge:5*1000})
        res.redirect('back')
      }
      else if (req.body.mail==''){
        res.cookie('Setting',"Un des champs est vide",{maxAge:5*1000})
        res.redirect('back')
      }
      else if(!EMAIL_REGEX.test(req.body.mail)){
        res.cookie('Setting',"L'adresse mail ne respecte pas le bon format",{maxAge:5*1000})
        res.redirect('back')
      }
      else{
          account.updateMail(req.body.mail,req.params.id, function(){
            res.cookie('Register',"Votre changement de mail a eu lieu avec succès",{maxAge:5*1000})
            res.redirect('back')
        })

  }
  })
  //res.redirect('/register')
},
setting_post2: function(req, res){
        if (req.body.pswd1== '' || req.body.pswd2==''){
          res.cookie('Setting',"Un des champs est vide",{maxAge:5*1000})
          res.redirect('back')
        }
        else if(!PASSWORD_REGEX.test(req.body.pswd2)) {
          res.cookie('Setting',"Le mot de passe doit contenir au moins 1 chiffre et au moins 4 caractères",{maxAge:5*1000})
          res.redirect('back')
        }
        else if(req.body.pswd1==req.body.pswd2) {
          res.cookie('Setting',"Les mot de passe sont identiques",{maxAge:5*1000})
          res.redirect('back')
        }
        else{
          console.log(req.body.pswd2)
          // VErifier que bon mot de passe
          //
          bcrypt.hash(req.body.pswd2, 6, function(err, psw){
            req.body.pswd2=psw
            account.updatePswd(req.body.pswd2,req.params.id, function(){
              res.cookie('Setting',"Votre changement de mot de passe a eu lieu avec succès",{maxAge:5*1000})
              res.redirect('back')
          })
      })
      }
}

//res.redirect('/register')
}
