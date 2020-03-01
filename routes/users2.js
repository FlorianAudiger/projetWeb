var express = require('express');
var router = express.Router();
var uCtrl = require('../controllers/uCtrl2')

// Router Exercises
// ! /exercise

router.get('/', uCtrl.allExercises_get)
router.get('/:id', uCtrl.exercise_get)
router.post('/:id', uCtrl.addRecord_post)


module.exports = router;
