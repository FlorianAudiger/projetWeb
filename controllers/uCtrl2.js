const jwt = require("../config/jwt")
const exer = require('../models/exercise')

module.exports = {
    exercise_get: function(req, res, next) {
        const token = req.cookies["Token"]
     //Gerer erreur si on cherche dans la barre URL un exo plus loin
            
            exer.aExercise(req.params.id,jwt.idAccountToken(token), function(resDB){
                exer.aExerciseAllRecord(req.params.id,jwt.idAccountToken(token), function(resDB2){
                    exer.aExerciseAllDate(req.params.id,jwt.idAccountToken(token), function(resDB3){

                        //var a = res.json(resDB2)
                        //res.render('users/exercise', {title: "Exercice", resDB, resDB3});
            })
        })
    })
          
    },
    allExercises_get: function(req, res, next) {
            exer.allExercises(function(resDB){
                exer.allMuscles(function(resDB2){
                    exer.allEquipments(function(resDB3){
                res.render('users/allExercise', {title: "Liste des exercices", resDB, resDB2, resDB3});
            })
        })
    })
    },
    addRecord_post: function(req, res, next) {
            const token = req.cookies["Token"]
            exer.createRecord(req.body, jwt.idAccountToken(token), req.params.id, function(resDB){
                res.redirect('back');        
        })
    },
    allExercises_post: function(req, res, next) {
        if(req.body.muscle == "Tous les muscles" && req.body.materiel == "Tous les matériels"){
            res.redirect('back'); 
        }
        else if(req.body.muscle == "Tous les muscles" && req.body.materiel != "Tous les matériels"){
            exer.allExercisesByEquipment(req.body.materiel, function(resDB){
                exer.allMuscles(function(resDB2){
                    exer.allEquipments(function(resDB3){
                res.render('users/allExercise', {title: "Liste des exercices", resDB, resDB2, resDB3});
            })
        })
    })
}
        else if(req.body.muscle != "Tous les muscles" && req.body.materiel == "Tous les matériels"){
            exer.allExercisesByMuscle(req.body.muscle, function(resDB){
                exer.allMuscles(function(resDB2){
                    exer.allEquipments(function(resDB3){
                res.render('users/allExercise', {title: "Liste des exercices", resDB, resDB2, resDB3});
            })
        })
    })
}
        else{
            exer.allExerciceByEquipmentMuscle(req.body.materiel, req.body.muscle, function(resDB){
                exer.allMuscles(function(resDB2){
                    exer.allEquipments(function(resDB3){
                res.render('users/allExercise', {title: "Liste des exercices", resDB, resDB2, resDB3});
            })
        })
    }) 
}

    
}
}

    