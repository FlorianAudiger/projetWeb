//Import
const account = require("../models/account")
const bcrypt = require('bcrypt');
const jwt = require("../config/jwt")

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,16}$/;


module.exports = {
  register_post: function (req, res) {
    account.boolMail(req.body, function (resDB) {
      if (resDB == 1) {
        res.cookie('Register', ["Erreur de connexion avec la base de donnée", 1], {
          maxAge: 5 * 1000
        })
        res.status(400).redirect('/register')
      } else {
        if (resDB != undefined) {
          res.cookie('Register', ["L'adresse mail existe déjà", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('/register')
        } else if (req.body.mail == '' || req.body.pswd[0] == '' || req.body.firstname == '' || req.body.lastname == '') {
          res.cookie('Register', ["Un des champs est vide", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('/register')
        } else if (req.body.firstname.length >= 20 || req.body.lastname.length >= 20) {
          res.cookie('Register', ["Votre nom dépasse la taille limite", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('/register')
        } else if (!EMAIL_REGEX.test(req.body.mail)) {
          res.cookie('Register', ["L'adresse mail ne respecte pas le bon format", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('/register')
        } else if (!PASSWORD_REGEX.test(req.body.pswd[0])) {
          res.cookie('Register', ["Le mot de passe doit contenir au moins 1 chiffre et au moins 4 caractères", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('/register')
        } else if (req.body.pswd[0] != req.body.pswd[1]) {
          res.cookie('Register', ["Le mot de passe n'est pas identique", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('/register')
        } else {
          console.log(req.body.pswd[0])
          bcrypt.hash(req.body.pswd[0], 6, function (err, psw) {
            req.body.pswd[0] = psw
            account.create(req.body, function (resDB) {
              if (resDB == 1) {
                res.cookie('Register', ["Impossible de créer le compte", 1], {
                  maxAge: 5 * 1000
                })
                res.status(400).redirect('/register')
              } else {
                res.cookie('Register', ["Votre inscription a eu lieu avec succès", 2], {
                  maxAge: 5 * 1000
                })
                res.redirect('/register')
              }
            })
          })
        }
      }
    })
    //res.redirect('/register')

  },
  register_get: function (req, res, next) {
    const cookie = req.cookies["Register"]
    res.render('register', {
      title: "Inscription",
      msg: cookie
    });
  },
  login_get: function (req, res, next) {
    const cookie = req.cookies["Login"]
    res.render('login', {
      title: "Connexion",
      msg: cookie
    });
  },
  index_get: function (req, res, next) {
    res.render('index', {
      title: "Mon suivi sportif"
    });
  },
  logout_get: function (req, res, next) {
    res.clearCookie("Token");
    res.redirect('../');
  },

  login_post: function (req, res) {
    account.boolMail(req.body, function (resDB) {
      if (resDB == 1) {
        res.cookie('Login', ["Erreur de connexion avec la base de donnée", 1], {
          maxAge: 5 * 1000
        })
        res.status(400).redirect('/login')
      } else {
        if (resDB != undefined) { //login ok
          bcrypt.compare(req.body.pswd, resDB[0].MDP, function (err, resCrypt) {
            if (resCrypt) { //pwd ok
              var token = jwt.generateTokenForUser(resDB[0].IDCompte)
              res.cookie('Token', token, {
                maxAge: 604800 * 1000
              })
              res.redirect('/program')
            } else {
              res.cookie('Login', ["Votre mot de passe est incorrect", 1], {
                maxAge: 5 * 1000
              })
              res.status(400).redirect('/login')
            }
          })
        } else {
          res.cookie('Login', ["L'identifiant n'existe pas", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('/login')
        }
      }
    })
  },
  setting_get1: function (req, res, next) {
    const token = req.cookies["Token"]
    res.redirect("setting/" + jwt.idAccountToken(token))
  },
  setting_get2: function (req, res, next) {
    const token = req.cookies["Token"]
    const cookie = req.cookies["Setting"]
    if (jwt.idAccountToken(token) != req.params.id) { //Vérifie si on a accès au programme
      res.cookie('Setting', ["Vous n'avez pas les droits d'accès", 1], {
        maxAge: 5 * 1000
      })
      res.status(403).redirect("/setting/" + jwt.idAccountToken(token))
    } else {
      account.select(req.params.id, function (resDB) {
        if (resDB == 1) {
          res.render('error', {
            title: "Erreur",
            error: "",
            message: "Erreur connexion"
          });
        } else {
          res.render("users/setting", {
            title: "Paramètres",
            resDB,
            msg: cookie
          })
        }
      })

    }

  },
  setting_post1: function (req, res) {
    account.boolMail(req.body, function (resDB) {
      if (resDB == 1) {
        res.cookie('Setting', ["Erreur de connexion avec la base de donnée", 1], {
          maxAge: 5 * 1000
        })
        res.status(400).redirect('/back')
      } else {
        if (resDB != undefined) {
          res.cookie('Setting', ["L'adresse mail existe déjà", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('back')
        } else if (req.body.mail == '') {
          res.cookie('Setting', ["Un des champs est vide", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('back')
        } else if (!EMAIL_REGEX.test(req.body.mail)) {
          res.cookie('Setting', ["L'adresse mail ne respecte pas le bon format", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('back')
        } else {
          account.updateMail(req.body.mail, req.params.id, function (resDB) {
            if (resDB == 1) {
              res.cookie('Setting', ["Erreur de connexion avec la base de donnée", 1], {
                maxAge: 5 * 1000
              })
              res.status(400).redirect('back')
            } else {
              res.cookie('Setting', ["Votre changement de mail a eu lieu avec succès", 2], {
                maxAge: 5 * 1000
              })
              res.redirect('back')
            }
          })
        }
      }
    })
    //res.redirect('/register')
  },
  setting_post2: function (req, res) {
    if (req.body.pswd1 == '' || req.body.pswd2 == '') {
      res.cookie('Setting', ["Un des champs est vide", 1], {
        maxAge: 5 * 1000
      })
      res.status(400).redirect('back')
    } else if (!PASSWORD_REGEX.test(req.body.pswd2)) {
      res.cookie('Setting', ["Le mot de passe doit contenir au moins 1 chiffre et au moins 4 caractères", 1], {
        maxAge: 5 * 1000
      })
      res.status(400).redirect('back')
    } else if (req.body.pswd1 == req.body.pswd2) {
      res.cookie('Setting', ["Les mot de passe sont identiques", 1], {
        maxAge: 5 * 1000
      })
      res.status(400).redirect('back')
    } else {
      account.select(req.params.id, function (resDB) {
        if (resDB == 1) {
          res.cookie('Setting', ["Erreur de connexion avec la base de donnée", 1], {
            maxAge: 5 * 1000
          })
          res.status(400).redirect('/back')
        } else {
          bcrypt.compare(req.body.pswd1, resDB[0].MDP, function (err, resCrypt) {
            if (resCrypt) { //pwd ok
              bcrypt.hash(req.body.pswd2, 6, function (err, psw) {
                req.body.pswd2 = psw
                account.updatePswd(req.body.pswd2, req.params.id, function (resDB) {
                  if (resDB == 1) {
                    res.cookie('Setting', ["Erreur de connexion avec la base de donnée", 1], {
                      maxAge: 5 * 1000
                    })
                    res.status(400).redirect('back')
                  } else {
                    res.cookie('Setting', ["Votre changement de mot de passe a eu lieu avec succès", 2], {
                      maxAge: 5 * 1000
                    })
                    res.redirect('back')
                  }
                })

              })
            } else {
              res.cookie('Setting', ["Votre mot de passe est incorrect", 1], {
                maxAge: 5 * 1000
              })
              res.status(400).redirect('back')
            }
          })
        }
      })
    }
  }

  //res.redirect('/register')
}