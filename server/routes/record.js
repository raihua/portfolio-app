const express = require("express");

const recordRoutes = express.Router();

// Conn connects the DB to the app.
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectID for the _id.
const ObjectId = require("mongodb").ObjectId;


// Following section is for getting all project records.
recordRoutes.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb();

    db_connect
        .collection("portfolio")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// Following section helps get a single project by its id
recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let my_query = {_id: ObjectId(req.params.id)};
    db_connect
        .collection("portfolio")
        .findOne(my_query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// Following section helps create a new project record