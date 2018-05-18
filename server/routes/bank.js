var express = require("express");
var bank = express.Router();
const request = require("request");
var bodyParser = require("body-parser");

bank.use(bodyParser.json());

const url = require('../../config');

bank.get("/", function(req, res, next) {
    res.send({message:"Not Found !!!"});
});

bank.get('/bank-list', function(req, res, next) {
    request({
        uri: url.server_url,
        method: 'POST',
        body: JSON.stringify({
            query: 'query {bank_list{id, name, country}}'
        })
    },
    function(err, response, body) {
        if (!err && response.statusCode == 200) {
            result = JSON.parse(body);
            res.send(result.data.bank_list);
        }else {
            res.send({ message: err });
        }
    });
});


bank.get('/bank-detail', function(req, res, next) {
    if (!req.body.id){
        res.send({message: "Please set bank ID"})
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
                query: `query {bank_detail
                        (
                            id: "`+req.body.id+`"
                        ){
                            name,
                            country_id,
                        }}`
            })
        },
        function(err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send(result.data.bank_detail);
            }else {
                res.send({ message: err });
            }
        });
    }
});


bank.post('/bank-create', function(req, res, next) {
    if (!req.body.name || 
        !req.body.country_id ||
        !req.body.created_by) {
            res.send({message:"Data  bank is not completed"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                query: `mutation bankCreate{
                            bank_create(
                                name: "`+req.body.name+`",
                                country_id: "`+req.body.country_id+`",
                                created_by: "`+req.body.created_by+`",
                            ) {
                                bank_id
                            }
                        }`
                })
            },
            function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    res.send(result.data.bank_create);
                }else {
                    res.send({ message: err });
                }
            });
        }
});

bank.post('/bank-update', function(req, res, next) {
    if (!req.body.id ||
        !req.body.name || 
        !req.body.country_id ||
        !req.body.updated_by) {
            res.send({message: "Data update bank error"})
            return
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                    query: `mutation bankUpdate{
                            bank_update (
                                id: "`+req.body.id+`",			
                                name: "`+req.body.name+`",
                                country_id: "`+req.body.country_id+`",
                                updated_by: "`+req.body.updated_by+`",
                            ) {
                                id,
                                name,
                                country_id,
                                updated_at,
                                updated_by,
                            }
                        }`
                })
            },
            function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    console.log(result)
                    return
                    // res.send(result.data.bank_update);
                }
                res.send({message:result.errors})
            });
        }
});

module.exports = bank;