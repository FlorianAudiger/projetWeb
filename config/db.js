var mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "programmesport",
  port: 3000

  //TODO ADD PASSWORD
});

/*Connection
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/

db.connect()
console.log("Connected!"); //Voir plus haut

module.exports = db