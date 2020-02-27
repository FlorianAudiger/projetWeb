var express = require('express');
var router = express.Router();
var uCtrl = require('../controllers/usersController')

/* GET users listing. */


router.get('/', uCtrl.program_get)
//router.post('/', uCtrl.register_post)

module.exports = router;
