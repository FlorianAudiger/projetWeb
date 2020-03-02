//Import
const account = require("../models/account")
const bcrypt = require('bcrypt');
const jwt = require("../config/jwt")

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;


module.exports = {
    register_post: function(req, res){
        account.boolMail(req.body, function (resDB) {
          if(resDB!=undefined){
            res.cookie('Register',"L'adresse mail existe déjà",{maxAge:5*1000})
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
    if(!jwt.verifToken(token)){
            res.redirect('/login')
    }
    else{
      account.select(req.params.id, function(resDB){
        res.render("users/setting",{title: "Paramètres", resDB})
      })
    }

      
  }

}