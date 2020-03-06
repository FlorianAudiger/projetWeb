const db = require('../config/db')

class work {


    static create(content, idS, idE, cb) {

        db.query("INSERT INTO `seconstitue` (`IDExercice`, `IDSeance`, `TempsRepos`, `Serie`, `Repetition`, `Poids`) VALUES (?,?,?,?,?,?)",
            [idE, idS, content.repos, content.serie, content.repetition, content.poids],
            function (err, result) {
                if (err) throw err;
                console.log("Insert exo")
                db.query("UPDATE `seance` SET nbreEx=nbreEx+1 WHERE IDSeance=?", [idS], function (err, result2) {
                    if (err) throw err;
                    cb(result)
                });
            });
    }

    static allExercises(content, cb) {
        db.query("SELECT * FROM exercice, seconstitue WHERE exercice.IDExercice = seconstitue.IDExercice AND IDSeance = ?", [content], function (err, result) {
            if (err) throw err;
            cb(result)
        });
    }

    static deleteByIdWork(idS, idE, idW, cb) {
        db.query("DELETE FROM `seconstitue` WHERE IDExercice=? AND IDSeance=? AND IDWork=?", [idE, idS, idW], function (err, result) {
            if (err) throw err;
            console.log("SUP Seance")
            db.query("UPDATE `seance` SET nbreEx=nbreEx-1 WHERE IDSeance=?", [idS], function (err, result2) {
                if (err) throw err;
                cb(result)
            });
        });
    }
    static deleteByIdSession(content, cb) {
        console.log(content)
        db.query("DELETE FROM `seconstitue` WHERE IDSeance=?", [content], function (err, result) {
            if (err) throw err;
            console.log("SUP Seance")
            db.query("UPDATE `seance` SET nbreEx=nbreEx-1 WHERE IDSeance=?", [content], function (err, result2) {
                if (err) throw err;
                cb(result)
            });
        });
    }

    static cleanWork(cb) {
        db.query("DELETE FROM seconstitue WHERE IDWork NOT IN(SELECT IDWork FROM seance, seconstitue WHERE seance.IDSeance = seconstitue.IDSeance)", function (err, result) {
            if (err) throw err;
            console.log("CLEAN OK")
            cb(result)
        });
    }

    static workCount(idS, cb) {
        db.query("SELECT COUNT(IDWork) AS count FROM seconstitue WHERE IDSeance=?", [idS], function (err, result) {
            if (err) throw err;
            cb(result)
        });
    }

}

module.exports = work;