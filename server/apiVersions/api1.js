let express = require("express");

let api = express.Router();

api.get("/", (req, res) => {
    res.send("you are on index page");
});

module.exports = api;