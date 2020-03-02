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
        db.query("SELECT MAX(seance.Ordre) as max FROM `seance` WHERE IDProgramme = ?",[id],function(err, result){ //On récupère l'ordre
            if(err) throw err;
            var nbre;
            if(result[0].max==null){nbre = 1} else{nbre = result[0].max +1}
            db.query("INSERT INTO `seance` (`Nom`, `Ordre`, `IDProgramme`) VALUES (?,?,?)",
            [content.name,nbre,id]
            ,function(err, result){
                if(err) throw err;
                console.log("Insert seance")
                cb(result)
            });
        });
    }
    static deleteByIdProgram (content, cb){
        console.log("Tu plantes ici")
        db.query("DELETE FROM `seance` WHERE IDProgramme=?",[content]
        ,function(err, result){
            if(err) throw err;
            console.log("SUP Seance")
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