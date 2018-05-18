var express = require('express');
var home = express.Router();
const request = require('request');
var bodyParser = require('body-parser');
var http = require('http');

home.use(bodyParser.json());
const url = require('../../config');

home.get("/", function(req, res, next) {
  res.send({message: "Not Found !!!"});
});

module.exports = home;
