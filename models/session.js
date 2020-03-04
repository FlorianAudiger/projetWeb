const db = require('../config/db')
const work = require('./work')

class session{
    static allSessions (content, cb){
        db.query("SELECT * FROM seance WHERE IDProgramme = ?", [content]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }

    static aSession(content, cb){
        console.log(content)
        db.query("SELECT * FROM seance WHERE IDSeance = ?", [content]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }

    static create (content, id, cb){
            db.query("INSERT INTO `seance` (`Nom`, `nbreEx`, `IDProgramme`) VALUES (?,?,?)",
            [content.name,0,id]
            ,function(err, result){
                if(err) throw err;
                console.log("Insert seance")
                cb(result)
            });
    }
    static deleteByIdProgram (content, cb){
       
            db.query("DELETE FROM `seance` WHERE IDProgramme=?",[content]
            ,function(err, result){
                if(err) throw err;
                console.log("SUP Seance")
                work.cleanWork(function(resDB){ })
                cb(result)
            });
       
    }
    static deleteByIdSession (content, cb){
        console.log(content)
        work.deleteByIdSession(content, function(){
        db.query("DELETE FROM `seance` WHERE IDSeance=?",[content]
        ,function(err, result){
            if(err) throw err;
            console.log("SUP Seance")
            cb(result)
        });
    })
    }

    static count (idS, cb){
        console.log(idS)
        db.query("SELECT COUNT(IDExercice) as nb FROM seconstitue, seance WHERE seconstitue.IDSeance=? AND seance.IDSeance=?",
        [idS,idS]
        ,function(err, result){
            if(err) throw err;
            console.log("SUP Seance")
            cb(result)
        });
    }

}

module.exports = session;