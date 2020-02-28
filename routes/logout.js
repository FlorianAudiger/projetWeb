var express = require('express');
var router = express.Router();
var uCtrl = require('../controllers/usersCtrl')

/* GET users listing. */

router.get('/', uCtrl.logout_get)

module.exports = router;