var express = require('express');
var router = express.Router();
var uCtrl = require('../controllers/usersController')

/* GET users listing. */

// On est dans /program

router.get('/', uCtrl.program_get)
router.post('/', uCtrl.addProgram_post)
router.get('/deleteProgram/:id', uCtrl.deleteProgram_get)

router.get('/:id1/deleteSession/:id2', uCtrl.deleteSession_get)
router.get('/:id', uCtrl.session_get)
router.post('/:id', uCtrl.addSession_post)

router.get('/session/:id', uCtrl.work_get)
router.post('/session/:id', uCtrl.work_post)

module.exports = router;
