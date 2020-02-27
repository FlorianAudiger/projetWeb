const db = require('../config/db')

class programs{

    static create (content, id, cb){
        console.log(id + "LA")
        db.query("INSERT INTO `programme` (`Nom`, `Description`, `IDCompte`) VALUES (?,?,?)",
         [content.name,content.description,id]
        ,function(err, result){
            if(err) throw err;
            console.log("Insert programme")
            cb(result)
        });
    }
    static allPrograms (content, cb){
        console.log(content)
        db.query("SELECT * FROM programme WHERE IDCompte = ?", [content]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }



}

module.exports = programs;