const db = require('../config/db')
const bcrypt = require('bcrypt');
class account{

    static create (content, cb){
        db.query("INSERT INTO compte SET Mail = ?, MDP = ?, Prenom = ?, Nom = ?", [content.mail,content.pswd[0],content.firstname,content.lastname]
        ,function(err, result){
            if(err) {console.log("Impossible de créer le compte.");}
            else{
            cb(result)}
        });
    }
    static boolMail (content, cb){
        db.query("SELECT * FROM compte WHERE Mail = ?", [content.mail]
        ,function(err, result){
            if(err) throw err;
            cb(result[0])
        });
    }
    static boolPswd (content, id, cb){
        db.query("SELECT * FROM compte WHERE MDP=? AND IDCompte = ?", [content, id]
        ,function(err, result){
            if(err) throw err;
            cb(result[0])
        });
    }

    static select (content, cb){
        db.query("SELECT * FROM compte WHERE IDCompte = ?",[content]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }

    static updateMail (content, id, cb){
        db.query("UPDATE compte SET Mail= ? WHERE IDCompte =?",[content, id]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }
    static updatePswd (content, id, cb){
        db.query("UPDATE compte SET MDP= ? WHERE IDCompte =?",[content, id]
        ,function(err, result){
            if(err) throw err;
            cb(result)
        });
    }
}

module.exports = account;