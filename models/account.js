const db = require('../config/db')

class account{

    static create (content, cb){
        console.log("OK 1")
        /*db.query("INSERT INTO compte SET IDCompte = 1, Mail = ?, MDP = ?, Prenom = ?, nom = ?", ["1",content.mail,content.pswd[0],content.firstname,content.lastname], function(err, result){
            if(err) throw err
            cb(result)
            console.log("OK 2")
        })*/
        db.query("INSERT INTO compte SET Mail =?", [content.mail], function (err, result) {
            if (err) throw err;
            cb(result)
        });

    }

}

module.exports = account;