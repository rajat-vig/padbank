var constants = require('../../constants');
var response = require('../../response');
module.exports = function (app, db) {


    app.get('/api/permissions/detail/:id', function(req, res) {
        db.Permissions.findById(req.params.id).then(function(result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_ID_EXIST, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_FOUND, result));
            });
        });


    app.get('/api/permissions/all', function (req, res) {
        db.Permissions.findAll({}).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_USER, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USERS_FOUND, result));
        });
    });
    
    app.post('/api/permissions/new', function (req, res) {
        db.Permissions.create({
            permissiondescription: req.body.permissiondescription
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.BLANK_FIELDS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_CREATED, result));
        });
    });
    
    app.put('/api/permissions/update/:id', function (req, res) {
        db.Permissions.update({
            permissiondescription: req.body.permissiondescription
        }, 
        {
            where: {
                permissionid: req.params.id
            }
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_UPDATE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_UPDATED, result));
        });
    });
    
    app.delete('/api/permissions/delete/:id', function (req, res) {
        db.Permissions.destroy({
            where: {
                permissionid: req.params.id
            }        
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DELETE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_DELETED, result));
        });
    })

}