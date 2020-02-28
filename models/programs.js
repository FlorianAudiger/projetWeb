const db = require('../config/db')
const ses = require('./session')

class programs{

    static create (content, id, cb){
        db.query("INSERT INTO `programme` (`Nom`, `Description`, `IDCompte`) VALUES (?,?,?)",
         [content.name,content.description,id]
        ,function(err, result){
            if(err) throw err;
            console.log("Insert programme")
            cb(result)
        });
    }
    static delete (content, cb){
        ses.deleteByIdProgram(content, function(){
            db.query("DELETE FROM `programme` WHERE IDProgramme=?",[content]
            ,function(err, result){
                if(err) throw err;
                console.log("SUP programme")
                cb(result)
            });
        })
    }
    static allPrograms (content, cb){
        db.query("SELECT * FROM programme WHERE IDCompte = ?", [content]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }

    static aProgram (content, cb){
        db.query("SELECT * FROM programme WHERE IDProgramme = ?", [content]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }

    static programAcces (IDCompte, IDPro, cb){ //A refaire: On evite les conditions ici
        db.query("SELECT * FROM programme WHERE IDProgramme = ? AND IDCompte=?", [IDPro, IDCompte]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }

}

module.exports = programs;