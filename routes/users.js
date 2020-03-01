var express = require('express');
var router = express.Router();
var uCtrl = require('../controllers/uCtrl1')

// Router program
// ! /program

router.get('/', uCtrl.program_get)
router.post('/', uCtrl.addProgram_post)
router.get('/deleteProgram/:id', uCtrl.deleteProgram_get)

router.get('/:id', uCtrl.session_get)
router.post('/:id', uCtrl.addSession_post)
router.get('/:id1/deleteSession/:id2', uCtrl.deleteSession_get)

router.get('/session/:id', uCtrl.work_get)
router.post('/session/:id', uCtrl.work_post)
router.get('/session/:id1/deleteExercise/:id2', uCtrl.deleteWork_get)

module.exports = router;
