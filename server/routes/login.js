var express = require('express');
var login = express.Router();
const request = require('request');
var bodyParser = require('body-parser');
const url = require('../../config');

login.use(bodyParser.json());
login.get("/", function(req, res, next) {
    res.send({message:"Not Found !!!"});
});

login.post('/', function(req, res, next){
    if (!req.body.email ||
        !req.body.password) {
        res.send({ message: "Please set email and password" });
    } else {
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
                query: 'mutation login{ login(email:"'+req.body.email+'", password:"'+req.body.password+'"){id result}}'
            })
        }, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send(result.data.login);
            } else {
                res.send({ message: err });
            }
        });
    }
})
module.exports = login;