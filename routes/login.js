var express = require('express');
var router = express.Router();
var uCtrl = require('../controllers/usersCtrl')

/* GET users listing. */

router.get('/', uCtrl.login_get)
//router.post('/', uCtrl.register_post)

module.exports = router;