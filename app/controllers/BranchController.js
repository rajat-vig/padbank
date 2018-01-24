var constants = require('../../constants');
var response = require('../../response');
module.exports = function (app, db) {
    // CRUD
    app.get('/api/branch/detail/:id', function (req, res) {
        db.Branch.findById(req.params.id).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_BRANCH, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.BRANCH_FOUND, result));
        });
    });

    app.get('/api/branch/branchdetail/:id', function (req, res) {
        db.Branch.findAll({
            where: {
                branchid: req.params.id
            },
            include: [{model: db.Contact}]
        }).then(function (result) {
            res.json(response.createResponseObject(result));
        });
    });

    app.post('/api/branch/allbranch', function (req, res) {
        db.Branch.findAll({
            attributes: [[db.sequelize.fn('DISTINCT', db.sequelize.col('name')), 'name']],
            where: {
                district: req.body.district
            }
        }).then(function (result) {
                res.json(response.createResponseObject(constants.TRUE, constants.BRANCHES_FOUND, result));
          });
    });

    app.get('/api/branch/states', function (req, res) {
        db.Branch.findAll({
            attributes: [[db.sequelize.fn('DISTINCT', db.sequelize.col('state')), 'state']]
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_BRANCHES, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.BRANCHES_FOUND, result));
        });
    });

    app.post('/api/branch/districts', function (req, res) {
        db.Branch.findAll({
//          attributes: [[db.sequelize.fn('DISTINCT', db.sequelize.col('district')), 'district'], 'branchid'],
            attributes: [[db.sequelize.fn('DISTINCT', db.sequelize.col('district')), 'district']],
            where: {
                state: req.body.state
            }
          }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_BRANCHES, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.BRANCHES_FOUND, result));
        });
    });

    app.get('/api/branch/all', function (req, res) {
        db.Branch.findAll({}).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_BRANCHES, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.BRANCHES_FOUND, result));
        });
    });
    
    app.post('/api/branch/new', function (req, res) {
        db.Branch.create({
            name: req.body.name,
            address: req.body.address,
            state: req.body.state,
            district: req.body.district,
            city: req.body.city,
            pincode: req.body.pincode,
            subbranchid: req.body.subbranchid
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.MISSING_BRANCH_DETAILS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.BRANCH_DETAILS_ADDED, result));
        });
    });
    
    app.put('/api/branch/update/:id', function (req, res) {
        db.Branch.update({
            name: req.body.name,
            address: req.body.address,
            state: req.body.state,
            district: req.body.district,
            city: req.body.city,
            pincode: req.body.pincode,
            subbranchid: req.body.subbranchid
        }, 
        {
            where: {
                branchid: req.params.id
            }
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.BRANCH_NOT_UPDATED, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.BRANCH_UPDATED, result));
        });
    });
    
    app.delete('/api/branch/delete/:id', function (req, res) {
        db.Branch.destroy({
            where: {
                branchid: req.params.id
            }        
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.BRANCH_NOT_DELETED, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.BRANCH_DELETED, result));
        });
    });

    app.post('/api/branch/vregistration', function (req, res) {
        db.Branch.findOne({
            where: {
                name: req.body.name
            }
        }).then(function (branch) {
            var bid = (branch["branchid"]);
            db.Account.create({
                userid: req.body.userid,
                branchid: bid,
                roleid: 2
            });
            
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
                idvalue: req.body.idvalue
            }, 
            {
                where: {
                    userid: req.body.userid
                }
            }).then(function (result) {
                if (result==0) 
                    return res.json(response.createResponseObject(constants.FALSE, constants.BLANK_FIELDS, result)); 
                res.json(response.createResponseObject(constants.TRUE, constants.USER_CREATED, result));
            });
        });
    });
    
}