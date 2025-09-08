const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "caphemanhzu1997",
  database: "btl_2",
  port: 3306,
});

pool.getConnection((error) => {
  if (error) console.log("Cannot Connect to DB");
  else console.log("Connect to database successfully");
});

module.exports = pool.promise();
