const express = require("express");

const tutorialRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

tutorialRoutes.route("/tutorial").get(function (req,res){
    let db_connect = dbo.getDb("TutorialsDataBase");
    db_connect
        .collection("tutorials")
        .find({})
        .toArray(function (err, result){
            if (err) throw err;
            res.json(result);
        });
});

// get tuto by id
tutorialRoutes.route("/tutorial/:id").get(function(req,res){
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("tutorials")
        .findOne(myquery, function(err,result){
            if(err) throw err;
            res.json(result);
        });
});

//create new record
tutorialRoutes.route("/tutorial/add").post(function(req,response){
    let db_connect = dbo.getDb();
    let myobj = {
        tutorial_title: req.body.tutorial_title,
        tutorial_description: req.body.tutorial_description,
        tutorial_content: req.body.tutorial_content,
        tutorial_level: req.body.tutorial_level,
    };
    db_connect.collection("tutorials").insertOne(myobj, function (err,res){
        if (err) throw err;
        response.json(res);
    });
});


// update tuto
tutorialRoutes.route("/tutorial/:id").post(function(req,response){
    
})















