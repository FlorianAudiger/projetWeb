var mysql = require('mysql');

//LOL
const db = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
/*
//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password : '',
  database: "programmesport"

  //TODO ADD PASSWORD
});
*/
//Connection
db.connect(function(err) {
  if (err) console.log("Impossible de se connecter à la Base de données");
  else{
  console.log("Connected!");
  }
});


module.exports = db;