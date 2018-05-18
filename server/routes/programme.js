var express = require("express");
var programme = express.Router();
const request = require("request");
var bodyParser = require("body-parser");

programme.use(bodyParser.json());

const url = require('../../config');

programme.get("/", function(req, res, next) {
    res.send({message:"Not Found !!!"});
});

programme.get('/programme-detail', function(req, res, next){
    if(!req.body.id){
        res.send({message:"Please set data"})
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
                query: `query {programme_detail
                        (
                            id: "`+req.body.id+`"
                        ){
                            id,
                            name,
                            logo,
                            card_number_format,
                            lms_id,
                            bank_id,
                            issuer_point,
                            issuer_currency_exchange,
                            point_discount_rate_percentage,
                            min_redeem_percentage,
                            facilitation_fee,
                            point_cancel_fee,
                            currency_cancel_fee,
                            created_at,
                            created_by,
                            updated_at,
                            updated_by,
                        }}`
            })
        },
        function(err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send(result.data.programme_detail);
            }else {
                res.send({ message: err });
            }
        });
    }
})

programme.get('/programme-list', function(req, res, next){
    request({
        uri: url.server_url,
        method: 'POST',
        body: JSON.stringify({
            query: `query {programme_list{
                id,
                name,
                logo,
                card_number_format,
                lms_id,
                bank_id,
                issuer_point,
                issuer_currency_exchange,
                point_discount_rate_percentage,
                min_redeem_percentage,
                facilitation_fee,
                point_cancel_fee,
                currency_cancel_fee,
                created_at,
                created_by,
                updated_at,
                updated_by,
            }}`
        })
    },
    function(err, response, body) {
        if (!err && response.statusCode == 200) {
            result = JSON.parse(body);
            res.send(result.data.programme_list);
        }else {
            res.send({ message: err });
        }
    });
});

programme.post('/programme-create', function(req, res, next){
    if( !req.body.name ||
        !req.body.logo ||
        !req.body.personnel ||
        !req.body.card_number_format ||
        !req.body.lms_id ||
        !req.body.bank_id ||
        !req.body.issuer_point ||
        !req.body.issuer_currency_exchange ||
        !req.body.point_discount_rate_percentage ||
        !req.body.min_redeem_percentage ||
        !req.body.facilitation_fee ||
        !req.body.point_cancel_fee ||
        !req.body.currency_cancel_fee ||
        !req.body.created_by) {
            res.send({message:"Please set data programme"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                query: `mutation programmeCreate{
                            programme_create(
                                name : "`+req.body.name+`",
                                logo : "`+req.body.logo+`",
                                personnel : "`+req.body.personnel+`",
                                card_number_format : "`+req.body.card_number_format+`",
                                lms_id : "`+req.body.lms_id+`",
                                bank_id : "`+req.body.bank_id+`",
                                issuer_point : "`+req.body.issuer_point+`",
                                issuer_currency_exchange : "`+req.body.issuer_currency_exchange+`",
                                point_discount_rate_percentage : "`+req.body.point_discount_rate_percentage+`",
                                min_redeem_percentage : "`+req.body.min_redeem_percentage+`",
                                facilitation_fee : "`+req.body.facilitation_fee+`",
                                point_cancel_fee : "`+req.body.point_cancel_fee+`",
                                currency_cancel_fee : "`+req.body.currency_cancel_fee+`",
                                created_by : "`+req.body.created_by+`",
                            ) {
                                id
                            }
                        }`
                })
            },
            function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    res.send(result.data.programme_create);
                }else {
                    res.send({ message: err });
                }
            });
        }
})

programme.post('/programme-update', function(req, res, next){
    if( !req.body.id ||
        !req.body.name ||
        !req.body.logo ||
        !req.body.personnel ||
        !req.body.card_number_format ||
        !req.body.lms_id ||
        !req.body.bank_id ||
        !req.body.issuer_point ||
        !req.body.issuer_currency_exchange ||
        !req.body.point_discount_rate_percentage ||
        !req.body.min_redeem_percentage ||
        !req.body.facilitation_fee ||
        !req.body.point_cancel_fee ||
        !req.body.currency_cancel_fee ||
        !req.body.created_by) {
            res.send({message:"Please set data programme"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                query: `mutation programmeCreate{
                            programme_update(
                                id : "`+req.body.id+`",
                                name : "`+req.body.name+`",
                                logo : "`+req.body.logo+`",
                                personnel : "`+req.body.personnel+`",
                                card_number_format : "`+req.body.card_number_format+`",
                                lms_id : "`+req.body.lms_id+`",
                                bank_id : "`+req.body.bank_id+`",
                                issuer_point : "`+req.body.issuer_point+`",
                                issuer_currency_exchange : "`+req.body.issuer_currency_exchange+`",
                                point_discount_rate_percentage : "`+req.body.point_discount_rate_percentage+`",
                                min_redeem_percentage : "`+req.body.min_redeem_percentage+`",
                                facilitation_fee : "`+req.body.facilitation_fee+`",
                                point_cancel_fee : "`+req.body.point_cancel_fee+`",
                                currency_cancel_fee : "`+req.body.currency_cancel_fee+`",
                                created_by : "`+req.body.created_by+`",
                            ) {
                                id,
                                name,
                                logo,
                                personnel,
                                card_number_format,
                                lms_id,
                                bank_id,
                                issuer_point,
                                issuer_currency_exchange,
                                point_discount_rate_percentage,
                                min_redeem_percentage,
                                facilitation_fee,
                                point_cancel_fee,
                                currency_cancel_fee,
                                updated_at,
                                updated_by,
                            }
                        }`
                })
            },
            function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    res.send(result.data.programme_update);
                }else {
                    res.send({ message: err });
                }
            });
        }
})

module.exports = programme;