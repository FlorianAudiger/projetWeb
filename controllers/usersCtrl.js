//Import
const account = require("../models/account")
const bcrypt = require('bcrypt');
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
            account.create(req.body, function(){
            console.log("GG")
            res.redirect('/')
        })
      }
      })
    },
    register_get: function(req, res, next) {
        res.render('register');
    },
    login_get: function(req, res, next) {
        res.render('login');
    },

    login_post: function(req, res){
      account.checkLogin(req.body, function (resDB) {
        if(resDB!=undefined){
          console.log("LOGIN TROUVER");
          if(resDB.MDP==req.body.pswd){
            console.log("MDP PAREIL")
          }
          else{
            console.log("MDP DIFFERENT")
          }
          res.redirect('/')
        }
        else{
          console.log("ERREUR IDENTIFIANT N EXISTE PAS")
          res.redirect('/')
    }
    })
  }

}