var constants = require('../../constants');
var response = require('../../response');
module.exports = function (app, db) {


    app.get('/api/login/logindetail/:id', function (req, res) {
        db.Login.findAll({
            where: {
                userid: req.params.id
            },
            include: [{model: db.Transactions}]
        }).then(function (result) {
            res.json(response.createResponseObject(result));
        });
    });

    app.post('/api/login/user', function (req, res) {
        db.Login.findOne({
            where: {
                username: req.body.username,
                passwordhash: req.body.passwordhash
            }
        }).then(function (result) {
            if (!result) 
                return res.json(response.createResponseObject(constants.FALSE, "Invalid Username or Password", result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_FOUND, result));
        });
    });    


    app.get('/api/login/detail/:id', function(req, res) {
        db.Login.findById(req.params.id).then(function(result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_ID_EXIST, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_FOUND, result));
            });
        });


    app.get('/api/login/all', function (req, res) {
        db.Login.findAll({}).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_USER, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USERS_FOUND, result));
        });
    });
    
    app.post('/api/login/new', function (req, res) {
        db.Login.create({
            username: req.body.username,
            passwordhash: req.body.passwordhash,
            activeuser: req.body.activeuser
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.BLANK_FIELDS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_CREATED, result));
        });
    });
    
    app.put('/api/login/update/:id', function (req, res) {
        db.Login.update({
            username: req.body.username,
            passwordhash: req.body.passwordhash,
            activeuser: req.body.activeuser
        }, 
        {
            where: {
                userid: req.params.id
            }
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_UPDATE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_UPDATED, result));
        });
    });
    
    app.delete('/api/login/delete/:id', function (req, res) {
        db.Login.destroy({
            where: {
                userid: req.params.id
            }        
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DELETE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_DELETED, result));
        });
    })

}