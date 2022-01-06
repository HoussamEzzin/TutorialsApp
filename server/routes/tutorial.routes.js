
module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");

    let router = require("express").Router();

    router.post("/", tutorials.create);
    router.get("/", tutorials.findAll);
    router.get("/published", tutorials.findAllPublished);
}