const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Iamfab@14',
    database:'pulkit'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

app.use(express.json());
app.use(cors());

app.post("/insert", (req, res) => {
  const { pcd, borough, article4 } = req.body;
  const sql = `INSERT INTO test (pcd, borough, article4) VALUES ('${pcd}', '${borough}', '${article4}')`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send("Item inserted successfully");
  });
});

app.get("/readAll", (req, res) => {
  const sql = 'SELECT * FROM test';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/read/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM test WHERE pcd = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result[0]);
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM test WHERE pcd = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send("Item deleted successfully");
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { Description, Price, Quantity } = req.body;
  const sql = `UPDATE test SET Description = '(pcd, borough, article4) VALUES ('${pcd}', '${borough}', '${article4}')`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send("Item updated successfully");
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});