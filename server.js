var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/forms", (req, res, next) => {
    var sql = "select * from form"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

app.get("/api/form/:id", (req, res, next) => {
    var sql = "select * from form where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/api/form/", (req, res, next) => {
    var errors=[]
    if (!req.body.body){
        errors.push("No message body specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        title: req.body.title,
        email: req.body.email,
        body : req.body.body
    }
    var sql ='INSERT INTO form (title, email, body) VALUES (?,?,?)'
    var params =[data.title, data.email, data.body]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});

app.patch("/api/form/:id", (req, res, next) => {
    var data = {
        title: req.body.title,
        email: req.body.email,
        body : req.body.body
    }
    db.run(
        `UPDATE user set
           title = COALESCE(?,title),
           email = COALESCE(?,email),
           body = COALESCE(?,body)
           WHERE id = ?`,
        [data.title, data.email, data.body, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
});

app.delete("/api/form/:id", (req, res, next) => {
    db.run(
        'DELETE FROM form WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
});

// Default
app.use(function(req, res){
    res.status(404);
});

