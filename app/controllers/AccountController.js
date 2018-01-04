var constants = require('../../constants');
var response = require('../../response');
module.exports = function (app, db) {

    app.get('/api/account/detail/:id', function(req, res) {
        db.Account.findById(req.params.id).then(function(result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_ID_EXIST, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_FOUND, result));
            });
        });


    app.get('/api/account/all', function (req, res) {
        db.Account.findAll({}).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_USER, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USERS_FOUND, result));
        });
    });
    
    app.post('/api/account/new', function (req, res) {
        db.Account.create({
            userid: req.body.userid,
            branchid: req.body.branchid,
            roleid: req.body.roleid
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.BLANK_FIELDS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_CREATED, result));
        });
    });
    
    app.put('/api/account/update/:id', function (req, res) {
        db.Account.update({
            userid: req.body.userid,
            branchid: req.body.branchid,
            roleid: req.body.roleid
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
    
    app.delete('/api/account/delete/:id', function (req, res) {
        db.Account.destroy({
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