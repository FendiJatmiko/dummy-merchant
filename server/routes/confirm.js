var express = require("express");
var confirm = express.Router();
const request = require("request");
var bodyParser = require("body-parser");

confirm.use(bodyParser.json());

const url = require('../../config');

confirm.get("/", function(req, res, next) {
  res.send({message:"Not Found !!!"});
});

module.exports = confirm;
