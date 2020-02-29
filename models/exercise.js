const db = require('../config/db')
const ses = require('./session')

class exercise{


    static allExercises (cb){
        db.query("SELECT * FROM exercice",function(err, result){
            if(err) throw err;
            cb(result)
        });
    }

    static aExercise (content,id, cb){
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
        db.query("SELECT DATE_FORMAT(Date,'%d/%m/%Y') FROM exercice, fait WHERE fait.IDExercice = ? AND exercice.IDExercice=? AND fait.IDCompte=?",[content,content,id],
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

    static createRecord (content,idC,idE, cb){
        db.query("INSERT INTO `fait` (`IDCompte`,`IDExercice`,`PoidsMax`,`Date`) VALUES (?,?,?,?)", [idC,idE,content.poidsmax,content.date],
        function(err, result){
            if(err) throw err;
            cb(result)
        })
    }
  /*  static createDate (content, cb){
        console.log("DEBUT DATE")
        db.query("SELECT Date FROM date where Date=?", [content.date],
        function(err, result){
            if(err) throw err;
            
            if(result[0]==undefined){
                db.query("INSERT INTO date (`Date`) VALUES (?)", [content.date], function(res){
                    cb(res)
                    console.log("AJOUTER")
                })
            }
            else{
                cb(result)
                console.log("NON AJOUTER")
            }  
        })
    }
*/

}

module.exports = exercise;