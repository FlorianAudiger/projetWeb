const jwt = require("../config/jwt")
const exer = require('../models/exercise')

module.exports = {
    exercise_get: function(req, res, next) {
        const token = req.cookies["Token"]
     //Gerer erreur si on cherche dans la barre URL un exo plus loin
     const cookie = req.cookies["Exercise"]
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
                            //allDate.push(resDB3[i].Date)
                           a = resDB3[i].Date.split("/")
                            //var mydate = new Date(a[2],a[1],a[0]);
                            allDate.push(a)
                        }
                        console.log(allDate)
                        res.render('users/exercise', {title: "Exercice", msg:cookie ,resDB, allRecord, allDate, resDB4});
            })
        })
    })
})
          
    },
    allExercises_get: function(req, res, next) {
        var msg = undefined;
            exer.allExercises(function(resDB){
                exer.allMuscles(function(resDB2){
                    exer.allEquipments(function(resDB3){
                res.render('users/allExercise', {title: "Liste des exercices", msg, resDB, resDB2, resDB3});
            })
        })
    })
    },
    addRecord_post: function(req, res, next) {
            const token = req.cookies["Token"]
            exer.createRecord(req.body, jwt.idAccountToken(token), req.params.id, function(resDB){
                if(resDB==0){
                    res.cookie('Exercise',["Il n'est pas possible d'avoir deux record pour une même date",1],{maxAge:5*1000})
                    res.redirect('back'); 
                }
                else{
                res.cookie('Exercise',["Record ajouté avec succès",2],{maxAge:5*1000})
                res.redirect('back');    
                }    
        })
    },
    allExercises_post: function(req, res, next) {
        var msg = ["Filtre actif: \v Muscle: " + req.body.muscle + "---\v Matériel: " + req.body.materiel +"---",2]

        console.log(msg)
        if(req.body.muscle == "Tous les muscles" && req.body.materiel == "Tous les matériels"){
            res.redirect('back'); 
        }
        else if(req.body.muscle == "Tous les muscles" && req.body.materiel != "Tous les matériels"){
            exer.allExercisesByEquipment(req.body.materiel, function(resDB){
                exer.allMuscles(function(resDB2){
                    exer.allEquipments(function(resDB3){
                res.render('users/allExercise', {title: "Liste des exercices", msg, resDB, resDB2, resDB3});
            })
        })
    })
}
        else if(req.body.muscle != "Tous les muscles" && req.body.materiel == "Tous les matériels"){
            exer.allExercisesByMuscle(req.body.muscle, function(resDB){
                exer.allMuscles(function(resDB2){
                    exer.allEquipments(function(resDB3){
                res.render('users/allExercise', {title: "Liste des exercices", msg, resDB, resDB2, resDB3});
            })
        })
    })
}
        else{
            exer.allExerciceByEquipmentMuscle(req.body.materiel, req.body.muscle, function(resDB){
                exer.allMuscles(function(resDB2){
                    exer.allEquipments(function(resDB3){
                res.render('users/allExercise', {title: "Liste des exercices", msg, resDB, resDB2, resDB3});
            })
        })
    }) 
}

    
},
deleteRecord_get:function (req, res, next) {
    res.cookie('Exercise',["Record supprimé avec succès",2],{maxAge:5*1000})
          exer.deleteRecordById(req.params.id2, function(resDB){
            res.redirect('/exercise/'+req.params.id1);
          })
  }
}

    