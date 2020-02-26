var mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password : '',
  database: "programmesport"

  //TODO ADD PASSWORD
});

//Connection
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = db;