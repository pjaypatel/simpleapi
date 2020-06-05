var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE form (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text,
            email text UNIQUE,
            body text,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO form (title, email, body) VALUES (?,?,?)'
                // sample records
                db.run(insert, ["test title","admin@example.com","this is a test body"])
                db.run(insert, ["testing","user@example.com","this is another test body"])
            }
        });
    }
});


module.exports = db
