const db = require('../config/db')
const ses = require('./session')

class exercise{


    static allExercises (cb){
        db.query("SELECT * FROM exercice",function(err, result){
            if(err) throw err;
            cb(result)
        });
    }
    static allExercisesByEquipment (content, cb){
        db.query("SELECT exercice.Nom, exercice.Description, exercice.IDMateriel, exercice.IDExercice FROM exercice, materiel WHERE materiel.Nom=? AND materiel.IDMateriel=exercice.IDMateriel", [content],
        function(err, result){
            if(err) throw err;
            cb(result)
        });
    }
    static allExercisesByMuscle (content, cb){
        console.log(content)
        db.query("SELECT exercice.Nom, exercice.Description, exercice.IDMateriel, exercice.IDExercice FROM exercice, cible, muscle WHERE muscle.Nom=? AND muscle.IDMuscle=cible.IDMuscle AND cible.IDExercice = exercice.IDExercice", [content],
        function(err, result){
            if(err) throw err;
            cb(result)
        });
    }
    static allExerciceByEquipmentMuscle (idMa, idMu, cb){
        console.log(idMa,idMu)
        db.query("SELECT e.Nom, e.Description, e.IDMateriel, e.IDExercice FROM materiel AS ma, exercice AS e, cible AS c, muscle AS mu WHERE mu.Nom=? AND mu.IDMuscle=c.IDMuscle AND c.IDExercice = e.IDExercice AND ma.Nom=? AND ma.IDMateriel=e.IDMateriel",
        [idMu,idMa],
        function(err, result){
            console.log(result)
            if(err) throw err;
            cb(result)
        });
    }


    static allMuscles (cb){
        db.query("SELECT * FROM muscle",function(err, result){
            if(err) throw err;
            cb(result)
        });
    }
    static allEquipments (cb){
        db.query("SELECT * FROM materiel",function(err, result){
            if(err) throw err;
            cb(result)
        });
    }

    static aExercise (content, cb){
        db.query("SELECT * FROM exercice WHERE exercice.IDExercice=?",[content],
        function(err, result){
            if(err) throw err;
            cb(result)
        });
    }
    static aExerciseRecordDate (content,id, cb){
        db.query("SELECT * FROM exercice, fait WHERE fait.IDExercice = ? AND exercice.IDExercice=? AND fait.IDCompte=?",[content,content,id],
        function(err, result){
            if(err) throw err;
            cb(result)
        });
    }
    static aExerciseAllRecord (content,id, cb){
        db.query("SELECT PoidsMax FROM exercice, fait WHERE fait.IDExercice = ? AND exercice.IDExercice=? AND fait.IDCompte=?",[content,content,id],
        function(err, result){
            if(err) throw err;
            cb(result)
        });
    }
    static aExerciseAllDate (content,id, cb){
        db.query("SELECT DATE_FORMAT(Date,'%d/%m/%Y') as Date FROM exercice, fait WHERE fait.IDExercice = ? AND exercice.IDExercice=? AND fait.IDCompte=?",[content,content,id],
        function(err, result){
            if(err) throw err;
            cb(result)
        });
    }
    static selectIdByName (name, cb){
        console.log(name)
        db.query("SELECT IDExercice FROM exercice WHERE exercice.Nom=?", [name],
        function(err, result){
            if(err) throw err;
            cb(result[0].IDExercice)
        });
    }

    static recordDate (content,idC,idE, cb){
        db.query("SELECT * FROM `fait` WHERE IDCompte=? AND IDExercice=? AND Date=?", [idC,idE,content.date],
        function(err, result){
            if(err) throw err;
            cb(result)
        })
    }

    static createRecord (content,idC,idE, cb){
        this.recordDate(content,idC,idE, function(resDB){ // IF date already return error
            if(resDB[0] !=undefined){
                console.log("date existe deja")
                cb(0)}
                else{
        db.query("INSERT INTO `fait` (`IDCompte`,`IDExercice`,`PoidsMax`,`Date`) VALUES (?,?,?,?)", [idC,idE,content.poidsmax,content.date],
        function(err, result){
            if(err) throw err;
            cb(result)
        })
    }
    })
}

    static deleteRecordById(idW, cb){        
    db.query("DELETE FROM `fait` WHERE IDFait=?",[idW]
    ,function(err, result){
        if(err) throw err;
        console.log("SUP Record")
        cb(result)
    })

}
}

module.exports = exercise;