// Home ROUTER

var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/homeCtrl')

const verifyToken = require("../config/jwtVerif");

// Index
router.get('/', homeCtrl.index_get);

//Register
router.get('/register', homeCtrl.register_get)
router.post('/register', homeCtrl.register_post)

//Login
router.get('/login', homeCtrl.login_get)
router.post('/login', homeCtrl.login_post)

//Logout
router.get('/logout', verifyToken, homeCtrl.logout_get)

//Setting
router.get('/setting', verifyToken, homeCtrl.setting_get1)
router.get('/setting/:id', verifyToken, homeCtrl.setting_get2)
router.post('/setting/mail/:id', verifyToken, homeCtrl.setting_post1)
router.post('/setting/pswd/:id', verifyToken, homeCtrl.setting_post2)

module.exports = router;