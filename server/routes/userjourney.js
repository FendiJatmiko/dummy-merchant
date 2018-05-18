const express = require("express");
const journey = express.Router();
const request = require("request");
const bodyParser = require("body-parser");
var Auth = require('../../auth/');
const util = require('./util');
const url = require('../../config');


journey.use(bodyParser.json());

journey.all("/", function(req, res, next) {
    util.doRequest({ 
            query: `mutation {create (transaction: {order_id: "123", total_amount: 250.00, currency: "MYR"}, 
            items: [{name: "foo", category: "bar", price: 250.00, quantity: 1} ], customer: {first_name: "baz", last_name: "ban", email: "foo.bar@baz.ban", phone: "+6281990880318"},
            expiry: {start_time: "2018-05-26T18:24:34+07:00", unit: "minute", duration: 60} ) {transaction_id}}`
    },
    function(err, response, body) {
        if (!err && response.statusCode == 200) {
            result = JSON.parse(body); 
            res.send(result);
            console.log("ID is: ", result.transaction_id)
        }else{
            res.send({ message: err });
        }
    });
});


module.exports = journey;
