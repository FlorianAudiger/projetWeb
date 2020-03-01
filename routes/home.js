// Home ROUTER

var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/homeCtrl')

// Index
router.get('/', homeCtrl.index_get);
  
//Register
router.get('/register', homeCtrl.register_get)
router.post('/register', homeCtrl.register_post)

//Login
router.get('/login', homeCtrl.login_get)
router.post('/login', homeCtrl.login_post)

//Logout
router.get('/logout', homeCtrl.logout_get)

//Setting
router.get('/setting', homeCtrl.setting_get1)
router.get('/setting/:id', homeCtrl.setting_get2)
//router.post('/', uCtrl.login_post)

module.exports = router;
