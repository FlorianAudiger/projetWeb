var express = require('express');
var router = express.Router();
var uCtrl = require('../controllers/usersController2')

/* GET users listing. */

// On est dans /program

router.get('/', uCtrl.allExercises_get)
router.get('/:id', uCtrl.exercise_get)

module.exports = router;
