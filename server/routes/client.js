var express = require("express");
var client = express.Router();
const request = require("request");
var bodyParser = require("body-parser");

client.use(bodyParser.json());

const url = require('../../config');

client.get("/", function(req, res, next) {
    res.send({message:"Not Found !!!"});
});

client.get('/client-list', function(req, res, next){
    request({
        uri: url.server_url,
        method: 'POST',
        body: JSON.stringify({
            query: `query {client_list{
                            address, 
                            callback_uri, 
                            commission_fee, 
                            country{
                                id, 
                                name},
                            email,
                            id,
                            is_active,
                            name,
                            pic,
                            redirect_uri
                            refund_rate
                        }}`
        })
    },function (err, response, body) {
        if (!err && response.statusCode == 200) {
            result = JSON.parse(body);
            res.send(result.data.client_list);
        } else {
            res.send({ message: err });
        }
    });
});

client.post('/client-detail', function(req, res, next){
    if(!req.body.id) {
        res.send({message:"Please set client ID"})
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
                query: `query {client_detail(
                                id: "`+req.body.id+`"
                            ){
                                address, 
                                callback_uri, 
                                commission_fee, 
                                country{
                                    id, 
                                    name},
                                email,
                                id,
                                is_active,
                                name,
                                pic,
                                redirect_uri
                                refund_rate
                            }}`
            })
        },function (err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send(result.data.client_detail);
            } else {
                res.send({ message: err });
            }
        });
    }
})


client.post('/client-create', function(req, res, next){
    if( !req.body.name ||
        !req.body.address ||
        !req.body.country_id ||
        !req.body.pic ||
        !req.body.email ||
        !req.body.is_active ||
        !req.body.commission_fee ||
        !req.body.pg_fee ||
        !req.body.redirect_uri ||
        !req.body.callback_uri ||
        !req.body.created_by) {
            res.send({message: "Please set data client"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                    query: `mutation clientCreate {
                                client_create(
                                    name : "`+req.body.name+`",
                                    address : "`+req.body.address+`",
                                    country_id : "`+req.body.country_id+`",
                                    pic : "`+req.body.pic+`",
                                    email : "`+req.body.email+`",
                                    is_active : "`+req.body.is_active+`",
                                    commission_fee : "`+req.body.commission_fee+`",
                                    pg_fee : "`+req.body.pg_fee+`",
                                    redirect_uri : "`+req.body.redirect_uri+`",
                                    callback_uri : "`+req.body.callback_uri+`",
                                    created_by : "`+req.body.created_by+`",
                                ){
                                    client_id
                                }}`
                })
            },function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    res.send(result.data.client_detail);
                } else {
                    res.send({ message: err });
                }
            });
        }
});

client.post('/client-update', function(req, res, next){
    if( !req.body.id ||
        !req.body.name ||
        !req.body.address ||
        !req.body.country_id ||
        !req.body.pic ||
        !req.body.email ||
        !req.body.is_active ||
        !req.body.commission_fee ||
        !req.body.pg_fee ||
        !req.body.redirect_uri ||
        !req.body.callback_uri ||
        !req.body.updated_by) {
            res.send({message: "Please set data client"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                    query: `mutation clientCreate {
                                client_update(
                                    id : "`+req.body.id+`",
                                    name : "`+req.body.name+`",
                                    address : "`+req.body.address+`",
                                    country_id : "`+req.body.country_id+`",
                                    pic : "`+req.body.pic+`",
                                    email : "`+req.body.email+`",
                                    is_active : "`+req.body.is_active+`",
                                    commission_fee : "`+req.body.commission_fee+`",
                                    pg_fee : "`+req.body.pg_fee+`",
                                    redirect_uri : "`+req.body.redirect_uri+`",
                                    callback_uri : "`+req.body.callback_uri+`",
                                    updated_by : "`+req.body.updated_by+`",
                                ){
                                    id,
                                    name,
                                    address,
                                    country_id,
                                    pic,
                                    email,
                                    commission_fee,
                                    is_active,
                                    pg_fee,
                                    redirect_uri,
                                    callback_uri,
                                }}`
                })
            },function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    res.send(result.data.client_detail);
                } else {
                    res.send({ message: err });
                }
            });
        }
});

module.exports = client;