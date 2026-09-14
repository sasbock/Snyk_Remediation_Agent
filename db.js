const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');
  db.run("INSERT INTO users (name, email) VALUES ('alice', 'alice@example.com')");
  db.run("INSERT INTO users (name, email) VALUES ('bob', 'bob@example.com')");
});

module.exports = db;
