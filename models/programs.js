const db = require('../config/db')
const ses = require('./session')

class programs {

    static create(content, id, cb) {
        db.query("INSERT INTO `programme` (`Nom`, `Description`, `IDCompte`) VALUES (?,?,?)",
            [content.name, content.description, id],
            function (err, result) {
                if (err) {
                    cb(1)
                } else {
                    cb(result)
                }
            });
    }
    static delete(content, cb) {
        ses.deleteByIdProgram(content, function () {
            db.query("DELETE FROM `programme` WHERE IDProgramme=?", [content], function (err, result) {
                if (err) {
                    cb(1)
                } else {
                    cb(result)
                }
            });
        })
    }
    static allPrograms(content, cb) {
        db.query("SELECT * FROM programme WHERE IDCompte = ?", [content], function (err, result) {
            if (err) {
                cb(1)
            } else {
                cb(result)
            }
        });
    }

    static aProgram(content, cb) {
        db.query("SELECT * FROM programme WHERE IDProgramme = ?", [content], function (err, result) {
            if (err) {
                cb(1)
            } else {
                cb(result)
            }
        });
    }

    static programAcces(IDCompte, IDPro, cb) {
        db.query("SELECT * FROM programme WHERE IDProgramme = ? AND IDCompte=?", [IDPro, IDCompte], function (err, result) {
            if (err) {
                cb(1)
            } else {
                cb(result)
            }
        });
    }

    static programCount(IDCompte, cb) {
        db.query("SELECT COUNT(IDProgramme) AS count FROM programme WHERE IDCompte=?", [IDCompte], function (err, result) {
            if (err) {
                cb(1)
            } else {
                cb(result)
            }
        });
    }

}

module.exports = programs;