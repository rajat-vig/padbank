var constants = require('../../constants');
var response = require('../../response');
module.exports = function (app, db) {
    // CRUD


    app.get('/api/user/find/:id', function (req, res) {
        db.User.findOne({
            where: {
                userid: req.params.id
            }
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAIL, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_DETAIL, result));
        });
    });




    app.get('/api/user/userdetail/:id', function (req, res) {
        db.User.findAll({
            where: {
                userid: req.params.id
            },
            include: [{model: db.Login}]
        }).then(function (result) {
            res.json(response.createResponseObject(result));
        });
    });

    
    app.get('/api/user/all', function (req, res) {
        db.User.findAll({}).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAILS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USERS_DETAILS, result));
        });
    });
    
    app.post('/api/user/new', function (req, res) {
        db.User.create({
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            gender: req.body.gender,
            country: req.body.country,
            state: req.body.state,
            district: req.body.district,
            city: req.body.city,
            village: req.body.village,
            streetline1: req.body.streetline1,
            streetline2: req.body.streetline2,
            pincode: req.body.pincode,
            dob: req.body.dob,
            gitype: req.body.gitype,
            idvalue: req.body.idvalue,
            userid: req.body.userid
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.MISSING_DETAILS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.DETAILS_ADDED, result));
        });
    });
    
    app.put('/api/user/update/:id', function (req, res) {
        db.User.update({
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            gender: req.body.gender,
            country: req.body.country,
            state: req.body.state,
            district: req.body.district,
            city: req.body.city,
            village: req.body.village,
            streetline1: req.body.streetline1,
            streetline2: req.body.streetline2,
            pincode: req.body.pincode,
            dob: req.body.dob,
            gitype: req.body.gitype,
            idvalue: req.body.idvalue,
            userid: req.body.userid
        }, 
        {
            where: {
                userid: req.params.id
            }
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAILS_UPDATE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.DETAILS_UPDATED, result));
        });
    });
    
    app.delete('/api/user/delete/:id', function (req, res) {
        db.User.destroy({
            where: {
                userid: req.params.id
            }        
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAILS_DELETE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.DETAILS_DELETED, result));
        });
    })
    
}