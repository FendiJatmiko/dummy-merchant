var express = require("express");
var token = express.Router();
const request = require("request");
var bodyParser = require("body-parser");

token.use(bodyParser.json());

const url = require('../../config');

token.get("/", function(req, res, next) {
    res.send({message:"Not Found !!!"});
});

token.post('/token-list', function(req, res, next){
    request({
        uri: url.server_url,
        method: 'POST',
        body: JSON.stringify({
            query: `query {token_list{
                id,
                client_id,
                token,
                secret_key,
                expiry_date,
            }}`
        })
    },
    function(err, response, body) {
        if (!err && response.statusCode == 200) {
            result = JSON.parse(body);
            res.send(result.data.token_list);
        }else {
            res.send({ message: err });
        }
    });
})

token.post('/token-detail', function(req, res, next){
    if (!req.body.id){
        res.send({message: "Please set token ID"})
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
                query: `query {token_detail
                        (
                            id: "`+req.body.id+`"
                        ){
                            id,
                            client_id,
                            token,
                            secret_key,
                            expiry_date,
                        }}`
            })
        },
        function(err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send(result.data.token_detail);
            }else {
                res.send({ message: err });
            }
        });
    }
})

token.post('/token-create', function(req, res, next){
    if (!req.body.client_id || 
        !req.body.token ||
        !req.body.secret_key ||
        !req.body.expiry_date ||
        !req.body.created_by) {
            res.send({message:"Please set token data"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                query: `mutation tokenCreate{
                        token_create(  
                            client_id: "`+req.body.client_id+`",
                            token: "`+req.body.token+`",
                            secret_key: "`+req.body.secret_key+`",
                            expiry_date: "`+req.body.expiry_date+`",
                            created_by: "`+req.body.created_by+`",
                        ){
                            token_id
                        }}`
                })
            },
            function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    res.send(result.data.token_create);
                }else {
                    res.send({ message: err });
                }
            });
        }
})

token.post('/token-update', function(req, res, next){
    if (!req.body.id ||
        !req.body.client_id || 
        !req.body.token ||
        !req.body.secret_key ||
        !req.body.expiry_date ||
        !req.body.updated_by) {
            res.send({message:"Please set token data"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                query: `mutation tokenCreate{
                        token_create( 
                            id: "`+req.body.id+`", 
                            client_id: "`+req.body.client_id+`",
                            token: "`+req.body.token+`",
                            secret_key: "`+req.body.secret_key+`",
                            expiry_date: "`+req.body.expiry_date+`",
                            updated_by: "`+req.body.updated_by+`",
                        ){
                            id,
                            client_id,
                            token,
                            secret_key,
                            expiry_date,
                        }}`
                })
            },
            function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    res.send(result.data.token_create);
                }else {
                    res.send({ message: err });
                }
            });
        }
})

module.exports = token;