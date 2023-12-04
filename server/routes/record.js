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
recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let current_date = new Date();
    let my_object = {
        heading: req.body.heading,
        body: req.body.body,
        images: req.body.images,
        date_created: current_date,
        date_updated: current_date,
    };

    db_connect
        .collection("portfolio").insertOne(my_object, function (err, res) {
            if (err) throw err;
            response.json(res);
        });
});

// Following section updates a project record by id.
recordRoutes.route("update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let my_query = {_id: ObjectId(req.params.id)};
    let current_date = new Date();
    let new_values = {
        $set: {
            heading: req.body.heading,
            body: req.body.body,
            images: req.body.images,
            date_updated: current_date,
        }
    };

    db_connect
        .collection("portfolio")
        .updateOne(my_query, new_values, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// Following section deletes a record
recordRoutes.route(":id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let my_query = {_id: ObjectId(req.params.id)};
    
    db_connect
        .collection("portfolio")
        .deleteOne(my_query, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            response.json(obj);
        });
});

module.exports = recordRoutes;