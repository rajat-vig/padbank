var constants = require('../../constants');
var response = require('../../response');
module.exports = function (app, db) {
    // CRUD


    app.post('/api/contact/contactdetail', function (req, res) {
        db.Branch.findOne({
            where: {
                district: req.body.district
            }
        }).then(function (branch) {
            var bid = (branch["branchid"]);
            db.Contact.findAll({
                where: {
                    branchid: bid
                },
                include: [{model: db.Branch}]
            }).then(function (result) {
                res.json(response.createResponseObject(result));
            });
        });
    });

    app.get('/api/contact/detail/:id', function (req, res) {
        db.Contact.findOne({
            where: {
                branchid: req.params.id
            }
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAIL, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_DETAIL, result));
        });
    });
    
    app.get('/api/contact/all', function (req, res) {
        db.Contact.findAll({}).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAILS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USERS_DETAILS, result));
        });
    });
    
    app.post('/api/contact/new', function (req, res) {
        db.Contact.create({
            name: req.body.name,
            mobile: req.body.mobile,
            timing: req.body.timing,
            branchid: req.body.branchid
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.MISSING_DETAILS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.DETAILS_ADDED, result));
        });
    });
    
    app.put('/api/contact/update/:id', function (req, res) {
        db.Contact.update({
            name: req.body.name,
            mobile: req.body.mobile,
            timing: req.body.timing,
            branchid: req.body.branchid
        }, 
        {
            where: {
                branchid: req.params.id
            }
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAILS_UPDATE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.DETAILS_UPDATED, result));
        });
    });
    
    app.delete('/api/contact/delete/:id', function (req, res) {
        db.Contact.destroy({
            where: {
                branchid: req.params.id
            }        
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAILS_DELETE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.DETAILS_DELETED, result));
        });
    })
    
}