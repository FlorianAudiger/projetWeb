const db = require('../config/db')
const ses = require('./session')

class exercise{


    static allExercises (cb){
        db.query("SELECT * FROM exercice",function(err, result){
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

}

module.exports = exercise;