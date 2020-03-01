var express = require('express');
var router = express.Router();
var uCtrl = require('../controllers/usersCtrl')

/* GET users listing. */

router.get('/', uCtrl.setting_get1)
router.get('/:id', uCtrl.setting_get2)
//router.post('/', uCtrl.login_post)

module.exports = router;