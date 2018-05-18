const express = require("express");
const user = express.Router();
const request = require("request");
const bodyParser = require("body-parser");
user.use(bodyParser.json());
const url = require('../../config');
user.get("/", function(req, res, next) {
    res.send({message:"Not Found !!!"});
});

user.post('/user-detail', function(req, res, next){
    if(!req.body.user_id){
        res.send({message:"Please set user id"})
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
                query: `query {
                    user_detail(
                        user_id: "`+req.body.user_id+`"
                    ){
                        id,
                        full_name,
                        email,
                        password,
                        phone_number,
                        is_active,
                        programme_id,
                        access{
                            id,
                            name
                        },
                    }}`
            })
        },
        function(err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send(result.data.user_detail);
            }else {
                res.send({ message: err });
            }
        });
    }
})

user.post('/user-list', function(req, res, next){
    request({
        uri: url.server_url,
        method: 'POST',
        body: JSON.stringify({
            query: `query {
                user_list{
                    id,
                    full_name,
                    email,
                    password,
                    phone_number,
                    is_active,
                    programme_id,
                    access{
                        id,
                        name
                    },
                }}`
        })
    },
    function(err, response, body) {
        if (!err && response.statusCode == 200) {
            result = JSON.parse(body);
            res.send(result.data.user_list);
        }else {
            res.send({ message: err });
        }
    });
});

user.post('/user-create', function(req, res, next){
    if( !req.body.full_name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.phone_number ||
        !req.body.programme_id ||
        !req.body.created_by) {
            res.send({message:"Please set user data"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                    query: `mutation userCreate{
                            user_create(
                                full_name: "`+req.body.full_name+`",
                                email: "`+req.body.email+`",			
                                password: "`+req.body.password+`",
                                phone_number: "`+req.body.phone_number+`",
                                programme_id: "`+req.body.programme_id+`",
                                created_by: "`+req.body.created_by+`",
                           
                            ) {
                                user_id
                            }
                        }`
                })
            },
            function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    res.send(result.data.user_create);
                }else {
                    res.send({ message: err });
                }
            });
        }
})

user.post('/user-update', function(req, res, next){
    console.log(req.body)
    if( !req.body.id ||
        !req.body.full_name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.phone_number ||
        !req.body.programme_id ||
        !req.body.updated_by) {
            res.send({message: "Please set user data"})
        }else{
            request({
                uri: url.server_url,
                method: 'POST',
                body: JSON.stringify({
                    query: `mutation userUpdate{
                        user_update(
                                id: "`+req.body.id+`",
                                full_name: "`+req.body.full_name+`",
                                email: "`+req.body.email+`",			
                                password: "`+req.body.password+`",
                                phone_number: "`+req.body.phone_number+`",
                                programme_id: "`+req.body.programme_id+`",
                                access: "`+req.body.access+`",
                                updated_by: "`+req.body.updated_by+`",
                            ) {
                                result
                            }
                        }`
                })
            },
            function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    result = JSON.parse(body);
                    // res.send(result.data.user_update);
                }else {
                    res.send({ message: err });
                }
            });
        }

})

user.post('/hub-user-access-update', function(req, res, next){
    if (!req.body.user_id ||
        !req.body.access_id ||
        !req.body.updated_by){
            res.send({message: "Please set data user"})
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
                query: `mutation UserAccessUpdate{
                        hub_user_access_update(
                            user_id:"`+req.body.user_id+`",
                            access_id:"`+req.body.access_id+`",
                            created_by:"`+req.body.updated_by+`"
                        ){
                            result
                        }}`
            })
        },function (err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send({data:result.data.hub_user_access_update});
            } else {
                res.send({ message: err });
            }
        });
    }
});

user.post('/hub-user-access-delete', function(req, res, next){
    if (!req.body.user_id ||
        !req.body.access_id){
            res.send({message: "Data is not completed"})
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
                query: `mutation UserAccessDelete{
                    hub_user_access_delete(
                        user_id:"`+req.body.user_id+`", 
                        access_id:"`+req.body.access_id+`"
                    ){
                        result
                    }}`
            })
        },function (err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send({data:result.data.hub_user_access_delete});
            } else {
                res.send({ message: err });
            }
        });
    }
});

user.post('/user-status-update', function(req, res, next){
    if (!req.body.user_id ||
        !req.body.updated_by ||
        !req.body.is_active){
            res.send({message: "Data is not completed"})
    }else{
        request({
            uri: url.server_url,
            method: 'POST',
            body: JSON.stringify({
            query: `mutation UserStatusUpdate{
                        user_status_update(
                            user_id:"`+req.body.user_id+`",
                            is_active:`+req.body.is_active+`, 
                            updated_by:"`+req.body.updated_by+`"
                        ){
                            result
                        }}`
            })
        },function (err, response, body) {
            if (!err && response.statusCode == 200) {
                result = JSON.parse(body);
                res.send(result.data.user_status_update);
            } else {
                res.send({ message: err });
            }
        });
    }
});

user.get('/access-list', function(req, res, next){
    request({
        uri: url.server_url,
        method: 'POST',
        body: JSON.stringify({
            query: 'query {access_list{id, name}}',
        })
      },
      function(err, response, body) {
        if (!err && response.statusCode == 200) {
            result = JSON.parse(body);
            res.send(result.data.access_list);
        } else {
          res.send({ message: err });
        }
    });
});

module.exports = user;