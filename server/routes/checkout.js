var express = require("express");
var checkout = express.Router();
const request = require("request");
var bodyParser = require("body-parser");

checkout.use(bodyParser.json());

const url = require('../../config');

checkout.get("/", function(req, res, next) {
  res.send({message:"Not Found !!!"});
});

checkout.post('/checkout', function(req, res, next){
    if( !req.body.transaction_id ||
        !req.body.programme_id ||
        !req.body.bin ||
        !req.body.card_number){
            res.send({message:"Please set data checkout"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                    query: `mutation checkout{
                        checkout (
                            transaction_id: "`+req.body.transaction_id+`",
                            programme_id: "`+req.body.programme_id+`",
                            bin: "`+req.body.bind+`",
                            card_number: "`+req.body.card_number+`"
                        ) {
                            checkout_id
                        }
                    }`
                })
            },
            function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    res.send(result.data.checkout);
                }else {
                    res.send({ message: err });
                }
            });
        } 
})

module.exports = checkout;
