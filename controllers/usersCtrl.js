module.exports = {
    register_post: function(req, res){
        // Can't be undefined
        const account = require("../models/account")
      
        account.boolMail(req.body, function (resDB) {
          if(resDB == 1){
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
    }

}