var express = require("express");
var balance = express.Router();
const request = require("request");
var bodyParser = require("body-parser");

balance.use(bodyParser.json());

const url = require('../../config');

balance.get("/", function(req, res, next) {
  res.send({message:"Not Found !!!"});
});

balance.post('/balance-detail', function(req, res, next){
    if( !req.body.transaction_id ||
        !req.body.cc_num ||
        !req.body.bank_id) {
            res.send({message:"Please set data"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                query: `mutation balanceDetail{
                            balance_detail (
                                transaction_id: "`+req.body.transaction_id+`",
                                cc_num: "`+req.body.cc_num+`",
                                bank_id: "`+req.body.bank_id+`",
                            ) {
                                points_fee
                                points_balance
                                min_points_redeem
                                max_points_redeem
                                currency
                                value_per_point
                            }
                        }`
                })
            },
            function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    res.send(result.data.balance_detail);
                }else {
                    res.send({ message: err });
                }
            });
        }
})

module.exports = balance;