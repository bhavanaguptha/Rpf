var mysql = require("mysql");

var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "rpf",
  multipleStatements: true,
});


if(connection)
{
    console.log("connected")
}
else{
    console.log("not connected")
}

module.exports = connection;
