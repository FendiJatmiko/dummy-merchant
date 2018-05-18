var express = require('express');
var contract = express.Router();
const request = require('request');
var bodyParser = require('body-parser');
var http = require('http');

contract.use(bodyParser.json());
const url = "http://localhost:8100/graphql";


contract.get('/management', function(req, res) {
   res.send({
        nama: "asdada",
        hoby:[
            {
                name:"sss",
            },
            {
                name:"sss",
            },
            {
                name:"sss",
            },
            {
                name:"sss",
            },
        ],
        alamat: "asdadad",
    })
});

module.exports = contract;