var constants = require('../../constants');
var response = require('../../response');
var utility = require('../../utilities');
module.exports = function (app, db) {
    // CRUD


    app.get('/api/user/detail/:userid', function (req, res) {
        db.User.findAll({
            where: {
                userid: req.params.userid
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
            db.Login.update({
                isregistered: req.body.isregistered
            }, 
            {
                where: {
                    userid: req.body.userid
                }
            }).then(function (result1){
                if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.MISSING_DETAILS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.DETAILS_ADDED, result));
        });
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
    });




    app.get('/api/user/myaccount/:userid', function (req, res) {
        db.User.findAll({
            where: {
                userid: req.params.userid
            }
        }).then(function (user) {
            var fullname = utility.getFullName(user[0]["firstname"], user[0]["lastname"]);
            var contributorsince = (user[0]["createdAt"]).toISOString().slice(0, 19).replace('T', ' ');
            db.Account.findAll({
                attributes: ['roleid'],
                where: {
                    userid: req.params.userid
                }
            }).then(function (account) {
                db.Roles.findAll({
                    attributes: ['roletype'],
                    where: {
                        roleid: account[0]["roleid"]
                    }    
                }).then(function (roles) {
                    var roletype = roles[0]["roletype"];
                    if(roletype=="D"){
                        db.Inventory.findAll({
                            where: {
                                userid: req.params.userid,
                            }
                        }).then(function (inventory) {
                            db.Transactions.findAll({
                                where: {
                                    inventoryid: inventory[0]["inventoryid"],
                                    transactiontype: {in: ["D-OUT", "R-IN"]}
                                }    
                            }).then(function (transactions) {
                                var totaldonation = transactions[0]["unitcount"];
                                var totaldistributed = transactions[1]["unitcount"];
                                var result = {name: fullname, contributorsince: contributorsince, role: roletype, totaldonation: totaldonation, totaldistributed: totaldistributed, balance: totaldonation-totaldistributed};
                                if (result==0) 
                                    return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAIL, result)); 
                                res.json(response.createResponseObject(constants.TRUE, constants.USER_DETAIL, result));            
                            });
                        });
                            
                        }
                        else if(roletype=="V"){
                            db.Transactions.findAll({
                                where: {
                                    userid: req.params.userid,
                                    transactiontype: {in: ["V-IN", "V-OUT"]}
                                }    
                            }).then(function (transactions) {
                                var totalcollected = transactions[0]["unitcount"];
                                var totaldistributed = transactions[1]["unitcount"];
                                var result = {name: fullname, contributorsince: contributorsince, role: roletype, totalcollected: totalcollected, totaldistributed: totaldistributed, balance: totalcollected-totaldistributed};
                                if (result==0) 
                                    return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAIL, result)); 
                                res.json(response.createResponseObject(constants.TRUE, constants.USER_DETAIL, result));            
                            });
                        }
                    });   
                });
            });
        });
   
}