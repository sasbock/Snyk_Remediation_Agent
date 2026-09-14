const express = require('express');
const db = require('./db');

const app = express();

// VULNERABLE: user-controlled `name` is concatenated directly into the SQL
// string instead of being passed as a bound parameter.
app.get('/users/search', (req, res) => {
  const name = req.query.name;
  const query = "SELECT id, name, email FROM users WHERE name = '" + name + "'";

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = app;
