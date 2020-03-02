var express = require('express');
var router = express.Router();
var uCtrl = require('../controllers/uCtrl2')

const verifyToken = require("../config/jwtVerif");

// Router Exercises
// ! /exercise

router.get('/', verifyToken, uCtrl.allExercises_get)
router.post('/', verifyToken, uCtrl.allExercises_post)

router.get('/:id', verifyToken, uCtrl.exercise_get)
router.post('/:id', verifyToken, uCtrl.addRecord_post)


module.exports = router;
