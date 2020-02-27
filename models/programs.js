const db = require('../config/db')

class programs{

    static create (content, id, cb){
        db.query("INSERT INTO `programme` (`Nom`, `Description`, `IDCompte`) VALUES (?, ?, ?)",
         [content.name,content.description,content.firstname,id]
        ,function(err, result){
            if(err) throw err;
            console.log("Insert programme")
            cb(result)
        });
    }
    static allPrograms (content, cb){
        db.query("SELECT * FROM programme WHERE IDCompte = ?", [content]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }



}

module.exports = programs;