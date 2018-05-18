const express = require("express");
const lms = express.Router();
const request = require("request");
const bodyParser = require("body-parser");
const url = require('../../config');

lms.use(bodyParser.json());

lms.get("/", function(req, res, next) {
    res.send({message:"Not Found !!!"});
});

lms.get('/lms-list', function(req, res, next) {
    request({
        uri: url.server_url,
        method: 'POST',
        body: JSON.stringify({
            query: `query {lms_list{id, name}}`
        })
    },
    function(err, response, body) {
        if (!err && response.statusCode == 200) {
            result = JSON.parse(body);
            res.send(result.data.lms_list);
            console.log(result)
        }else {
            res.send({ message: err });
        }
    });
});

lms.post('/lms-create', function(req, res, next) {
    if(!req.body.name || !req.body.created_by) {
        res.send({message: "Please set lms name"})
        return
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
            query: `mutation createLMS{
                        lms_create (
                            name: "`+req.body.name+`",
                            created_by: "`+req.body.created_by+`"
                        ) {
                            id
                        }
                    }`
            })
        },
        function(err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send(result.data.lms_create);
                return
            }else {
                res.send({ message: err });
            }
        });
    }
});

lms.post('/lms-update', function(req, res, next) {
    
    if(!req.body.id || !req.body.name || !req.body.updated_by){
        res.send({message: "Please set lms name !!!"})
        return
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
                query: `mutation updateLMS{lms_update(id:"`+req.body.id+`", name:"`+req.body.name+`", updated_by:"`+req.body.updated_by+`") {id,name,updated_by}}`
            })
        },
        function(err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send(result.data.lms_update);
                return
            }else {
                res.send({ message: err });
            }
        });
    }
})

module.exports = lms;