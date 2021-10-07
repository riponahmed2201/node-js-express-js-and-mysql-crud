const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false })); // Remove
// app.use(express.urlencoded({extended: true})); // New
// Parse application/json
// app.use(bodyParser.json()); // Remove
// app.use(express.json()); // New

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//MYSQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "admin",
  password: "password",
  database: "nodejscrud",
});

// get all data
app.get("", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    // query(sqlString , callback)
    connection.query("SELECT * FROM crud", (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

// get data by id
app.get("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    // query(sqlString , callback)
    connection.query(
      "SELECT * FROM crud WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection to pool

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
});

// delete data by id
app.delete("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    // query(sqlString , callback)
    connection.query(
      "DELETE from crud WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection to pool

        if (!err) {
          // res.send(rows);
          res.send(`Crud with the Record  ID: ${[req.params.id]} has been removed.`);
        } else {
          console.log(err);
        }
      }
    );
  });
});

// Listen on environment port
app.listen(port, () => console.log(`Listen on port ${port}`));
