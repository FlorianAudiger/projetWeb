var express = require('express');
var router = express.Router();
var uCtrl = require('../controllers/uCtrl1')

const verifyToken = require("../config/jwtVerif");

// Router program --> Session --> Work

router.get('/', verifyToken, uCtrl.program_get)
router.post('/', verifyToken, uCtrl.addProgram_post)
router.get('/deleteProgram/:id', verifyToken, uCtrl.deleteProgram_get)

router.get('/:id', verifyToken, uCtrl.session_get)
router.post('/:id', verifyToken, uCtrl.addSession_post)
router.get('/:id1/deleteSession/:id2', verifyToken, uCtrl.deleteSession_get)

router.get('/session/:id', verifyToken, uCtrl.work_get)
router.post('/session/:id', verifyToken, uCtrl.work_post)
router.get('/session/:id1/deleteExercise/:id2/:id3', verifyToken, uCtrl.deleteWork_get)

module.exports = router;
