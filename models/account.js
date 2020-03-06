const db = require('../config/db')

class account{

    static create (content, cb){
        db.query("INSERT INTO compte SET Mail = ?, MDP = ?, Prenom = ?, Nom = ?", [content.mail,content.pswd[0],content.firstname,content.lastname]
        ,function(err, result){
            if(err) {cb(0)}
            else{cb(result)}
        });
    }
    static boolMail (content, cb){
        db.query("SELECT * FROM compte WHERE Mail = ?", [content.mail]
        ,function(err, result){
            if(err) {cb(0)}
            else{cb(result)}
        });
    }

    static select (content, cb){
        db.query("SELECT * FROM compte WHERE IDCompte = ?",[content]
        ,function(err, result){
            if(err) {cb(0)}
            else{cb(result)}
        });
    }

    static updateMail (content, id, cb){
        db.query("UPDATE compte SET Mail= ? WHERE IDCompte =?",[content, id]
        ,function(err, result){
            if(err) {cb(0)}
            else{cb(result)}
        });
    }
    static updatePswd (content, id, cb){
        db.query("UPDATE compte SET MDP= ? WHERE IDCompte =?",[content, id]
        ,function(err, result){
            if(err) {cb(0)}
            else{cb(result)}
        });
    }
}

module.exports = account;