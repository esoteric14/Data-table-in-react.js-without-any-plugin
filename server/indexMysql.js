const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const db = mysql.createConnection({
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
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
  const { Ino, Description, Price, Quantity } = req.body;
  const sql = `INSERT INTO items (Ino, Description, Price, Quantity) VALUES ('${Ino}', '${Description}', '${Price}', '${Quantity}')`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send("Item inserted successfully");
  });
});

app.get("/readAll", (req, res) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/read/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM items WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result[0]);
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM items WHERE id = ${id}`;
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
  const sql = `UPDATE items SET Description = '${Description}', Price = '${Price}', Quantity = '${Quantity}' WHERE id = ${id}`;
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
