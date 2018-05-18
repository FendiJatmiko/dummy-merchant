var express = require("express");
var promopoint = express.Router();
const request = require("request");
var bodyParser = require("body-parser");

promopoint.use(bodyParser.json());

const url = require('../../config');

promopoint.get("/", function(req, res, next) {
  res.send({message:"Not Found !!!"});
});

promopoint.post('/generate-promopoint', function(req, res, next){
    if (!req.body.bank_id ||
        !req.body.client_id ||
        !req.body.code_prefix ||
        !req.body.point||
        !req.body.code_length ||
        !req.body.count ||
        !req.body.start_date||
        !req.body.expired_date){
            res.send({message: "Data is not completed"})
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
                query: '{generate_promopoint_csv(bank_id:"'+req.body.bank_id+'",client_id:"'+req.body.client_id+'",code_prefix:"'+req.body.code_prefix+'",point:"'+req.body.point+'",code_length:'+req.body.code_length+',count:'+req.body.count+',start_date:'+req.body.start_date+',expired_date:'+req.body.expired_date+'){bank_id, client_id, code, expired_date, point, start_date}}'
            })
        },function (err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send(result.data.generate_promopoint_csv);
            } else {
                res.send({ message: err });
            }
        });
    }
})

module.exports = promopoint;