const db = require('../config/db')
const work = require('./work')

class session {
    static allSessions(content, cb) {
        db.query("SELECT * FROM seance WHERE IDProgramme = ?", [content], function (err, result) {
            if (err) {
                cb(1)
            } else {
                cb(result)
            }
        });
    }

    static aSession(content, cb) {
        db.query("SELECT * FROM seance WHERE IDSeance = ?", [content], function (err, result) {
            if (err) {
                cb(1)
            } else {
                cb(result)
            }
        });
    }

    static create(content, id, cb) {
        db.query("INSERT INTO `seance` (`Nom`, `nbreEx`, `IDProgramme`) VALUES (?,?,?)",
            [content.name, 0, id],
            function (err, result) {
                if (err) {
                    cb(1)
                } else {
                    cb(result)
                }
            });
    }
    static deleteByIdProgram(content, cb) {

        db.query("DELETE FROM `seance` WHERE IDProgramme=?", [content], function (err, result) {
            if (err) {console.log(err)};
            work.cleanWork(function (resDB) {})
            cb(result)
        });

    }
    static deleteByIdSession(content, cb) {
        work.deleteByIdSession(content, function () {
            db.query("DELETE FROM `seance` WHERE IDSeance=?", [content], function (err, result) {
                if (err) {
                    cb(1)
                } else {
                    cb(result)
                }
            });
        })
    }

    static count(idS, cb) {
        db.query("SELECT COUNT(IDExercice) as nb FROM seconstitue, seance WHERE seconstitue.IDSeance=? AND seance.IDSeance=?",
            [idS, idS],
            function (err, result) {
                if (err) {console.log(err)};
                cb(result)
            });
    }

    static sessionAcces(idC, idS, cb) {
        db.query("SELECT * FROM seance, programme WHERE seance.IDProgramme=programme.IDProgramme AND programme.IDCompte=? AND seance.IDSeance=?", [idC, idS], function (err, result) {
            if (err) {console.log(err)};
            cb(result)
        });
    }

    static sessionCount(idP, cb) {
        db.query("SELECT COUNT(IDSeance) AS count FROM seance WHERE IDProgramme=?", [idP], function (err, result) {
            if (err) {console.log(err)};
            cb(result)
        });
    }

}

module.exports = session;