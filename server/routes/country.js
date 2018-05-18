var express = require("express");
var country = express.Router();
const request = require("request");
var bodyParser = require("body-parser");

country.use(bodyParser.json());

const url = require('../../config');

country.get("/", function(req, res, next) {
    res.send({message:"Not Found !!!"});
});


country.post('/country-list', function(req, res, next) {
    request({
        uri: url.server_url,
        method: 'POST',
        body: JSON.stringify({
            query: `query {country_list{id, name, code, currency}}`
        })
    },
    function(err, response, body) {
        if (!err && response.statusCode == 200) {
            result = JSON.parse(body);
            res.send(result.data.country_list);
        }else {
            res.send({ message: err });
        }
    });
});

module.exports = country;