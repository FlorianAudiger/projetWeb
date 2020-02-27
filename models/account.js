const db = require('../config/db')
const bcrypt = require('bcrypt');
class account{

    static create (content, cb){
        db.query("INSERT INTO compte SET Mail = ?, MDP = ?, Prenom = ?, Nom = ?", [content.mail,content.pswd[0],content.firstname,content.lastname]
        ,function(err, result){
            if(err) throw err;
            console.log("Insert compte")
            cb(result)
        });
    }
    static boolMail (content, cb){
        db.query("SELECT * FROM compte WHERE Mail = ?", [content.mail]
        ,function(err, result){
            if(err) throw err;
            cb(result[0])
        });
    }

    static checkLogin (content, cb){ // Enlever ?
        console.log(content)
            db.query("SELECT MDP FROM compte WHERE Mail=?", [content.mail]
            ,function(err, result){
                if(err) throw err;
                cb(result[0])
            });
    }

}

module.exports = account;