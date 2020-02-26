const db = require('../config/db')

class account{

    static create (content, cb){
        db.query("INSERT INTO compte SET Mail = ?, MDP = ?, Prenom = ?, Nom = ?", [content.mail,content.pswd[0],content.firstname,content.lastname]
        ,function(err, result){
            if(err) throw err;
            console.log("Insert compte")
            cb(result)
        });
    }

    static all (cb){
        db.query("SELECT * FROM compte", function (err, results){
            if(err) throw err;
            console.log(results);
        });
    }

    static boolMail (content, cb){
        db.query("SELECT * FROM compte WHERE Mail = ?", [content.mail]
        ,function(err, result){
            if(err) throw err;
            if(result[0]==undefined){
                cb(0);
            }
            else{
                cb(1);
            }
        });
    }

}

module.exports = account;