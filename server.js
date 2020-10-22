const path = require("path");
const fs = require("fs");
const express = require("express");
const uuid = require("uuid");
const {json} = require("express")

var app = express();
const PORT = 7500;

app.use(express.urlencoded( {
    extended: true
}));
app.use(express.static("public"));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/api/notes", function (req, res) {
    var apiNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    res.json(apiNotes);
});

app.post("/api/notes", function (req, res) {
    var body = req.body;
    body.id = Math.floor(Math.random()*1000)

    let arrayNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    arrayNote.push(body);
    fs.writeFileSync("./db/db.json", JSON.stringify(arrayNote), "utf8");
    res.json(arrayNote);
});

app.delete("/api/notes/:id", function (req, res) {
    let deleteNote 
})

app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT)
});