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

    
   
}

module.exports = work;