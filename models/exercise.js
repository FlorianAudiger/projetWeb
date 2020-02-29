const db = require('../config/db')
const ses = require('./session')

class exercise{


    static allExercises (cb){
        db.query("SELECT * FROM exercice",function(err, result){
            if(err) throw err;
            cb(result)
        });
    }

}

module.exports = exercise;