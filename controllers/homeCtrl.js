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
            console.log("MAIL DEjA PRESENT DANS LA DB");
            res.redirect('/')
          }
          else{
            console.log(req.body.pswd[0])
            bcrypt.hash(req.body.pswd[0], 6, function(err, psw){
              req.body.pswd[0]=psw
              account.create(req.body, function(){
                console.log("GG")
                res.redirect('/')
            })

        })
      }
      })
    },
    register_get: function(req, res, next) {
        res.render('register', {title: "Inscription"});
    },
    login_get: function(req, res, next) {
        res.render('login', {title: "Connexion"});
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
        if(resDB!=undefined){
          console.log("LOGIN TROUVER");
          bcrypt.compare(req.body.pswd, resDB.MDP, function(err, resCrypt){
            if(resCrypt){
              console.log("MDP PAREIL")
              var token = jwt.generateTokenForUser(resDB.IDCompte)
              res.cookie('Token',token,{maxAge:600*1000})
              res.redirect('/program')
            }
            else{
              console.log("MDP DIFFERENT")
              res.redirect('/')
            }
          })
        }
        else{
          console.log("ERREUR IDENTIFIANT N EXISTE PAS")
          res.redirect('/')
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