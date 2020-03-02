const db = require('../config/db')

class work{


    static create (content, idS, idE, cb){

            db.query("INSERT INTO `seconstitue` (`IDExercice`, `IDSeance`, `TempsRepos`, `Serie`, `Repetition`, `Poids`) VALUES (?,?,?,?,?,?)",
            [idE,idS,content.repos,content.serie,content.repetition,content.poids]
            ,function(err, result){
                if(err) throw err;
                console.log("Insert exo")
                cb(result)
            });
    }

    static allExercises (content, cb){
        db.query("SELECT * FROM exercice, seconstitue WHERE exercice.IDExercice = seconstitue.IDExercice AND IDSeance = ?", [content]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }

    static deleteByIdWork (idS,idE, cb){
        db.query("DELETE FROM `seconstitue` WHERE IDExercice=? AND IDSeance=?",[idE,idS]
        ,function(err, result){
            if(err) throw err;
            console.log("SUP Seance")
            cb(result)
        });
    }
    static deleteByIdSession (content, cb){
        console.log(content)
        db.query("DELETE FROM `seconstitue` WHERE IDSeance=?",[content]
        ,function(err, result){
            if(err) throw err;
            console.log("SUP Seance")
            cb(result)
        });
    }
   
}

module.exports = work;