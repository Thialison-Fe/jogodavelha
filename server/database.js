const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE scores (player TEXT, wins INTEGER)");

    const stmt = db.prepare("INSERT INTO scores VALUES (?, ?)");
    stmt.run("X", 0);
    stmt.run("O", 0);
    stmt.finalize();
});

module.exports = db;
