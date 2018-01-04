var constants = require('../../constants');
var response = require('../../response');
module.exports = function (app, db) {


    app.get('/api/transactions/detail/:id', function(req, res) {
        db.Transactions.findById(req.params.id).then(function(result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_ID_EXIST, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_FOUND, result));
            });
        });


    app.get('/api/transactions/all', function (req, res) {
        db.Transactions.findAll({}).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_USER, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USERS_FOUND, result));
        });
    });
    
    app.post('/api/transactions/new', function (req, res) {
        db.Transactions.create({
            transactiontype: req.body.transactiontype,
            userid: req.body.userid,
            branchid: req.body.branchid,
            unitcount: req.body.unitcount,
            transactiondatetime: req.body.transactiondatetime,
            inventoryid: req.body.inventoryid
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.BLANK_FIELDS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_CREATED, result));
        });
    });
    
    app.put('/api/transactions/update/:id', function (req, res) {
        db.Transactions.update({
            transactiontype: req.body.transactiontype,
            userid: req.body.userid,
            branchid: req.body.branchid,
            unitcount: req.body.unitcount,
            transactiondatetime: req.body.transactiondatetime,
            inventoryid: req.body.inventoryid
        }, 
        {
            where: {
                transactionid: req.params.id
            }
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_UPDATE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_UPDATED, result));
        });
    });
    
    app.delete('/api/transactions/delete/:id', function (req, res) {
        db.Transactions.destroy({
            where: {
                transactionid: req.params.id
            }        
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DELETE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_DELETED, result));
        });
    })

}