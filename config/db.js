var mysql = require('mysql');

// Connection datebase with heroku
//const connection= mysql.createPool(process.env.CLEARDB_DATABASE_URL);

//Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: "programmesport"

  //TODO ADD PASSWORD
});

//Connection
connection.connect(function (err) {
  if (err) {
    throw err
  } else {
    console.log("Connected!");
  }
});
/*
connection.getConnection((err, connection) => {
  if(err)
      console.error("Connexion impossible à la base de données");
  if(connection)
      connection.release();
});
*/
module.exports = connection;