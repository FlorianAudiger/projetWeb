const jwt = require("../config/jwt")
const exer = require('../models/exercise')

module.exports = {
    exercise_get: function(req, res, next) {
        const token = req.cookies["Token"]
     //Gerer erreur si on cherche dans la barre URL un exo plus loin
    
            exer.aExercise(req.params.id, function(resDB){
                exer.aExerciseRecordDate(req.params.id,jwt.idAccountToken(token), function(resDB4){
                exer.aExerciseAllRecord(req.params.id,jwt.idAccountToken(token), function(resDB2){
                    exer.aExerciseAllDate(req.params.id,jwt.idAccountToken(token), function(resDB3){
                        var allRecord = []
                        for(let i = 0; i < resDB2.length; i++){
                            allRecord.push(resDB2[i].PoidsMax)
                        }
                        var allDate = []
                        for(let i = 0; i < resDB3.length; i++){
                            allDate.push(resDB3[i].Date)
                        }

                        res.render('users/exercise', {title: "Exercice", resDB, allRecord, allDate, resDB4});
            })
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

    