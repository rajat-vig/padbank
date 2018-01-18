var constants = require('../../constants');
var response = require('../../response');
var utility = require('../../utilities');
module.exports = function (app, db) {
const Op = db.sequelize.Op;
const Fn = db.sequelize.fn;

    // CRUD


    app.get('/api/callback/detail/:id', function (req, res) {
        db.Callback.findOne({
            where: {
                userid: req.params.id
            }
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAIL, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USER_DETAIL, result));
        });
    });
    
    app.get('/api/callback/all', function (req, res) {
        db.Callback.findAll({}).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAILS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.USERS_DETAILS, result));
        });
    });
    
    app.post('/api/callback/new', function (req, res) {
        //var totalpads = utility.checkIfAmount(req.body.amount, req.body.unit);
        db.Callback.create({
            name: req.body.name,
            city: req.body.city,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
            unit: req.body.unit,
            amount: req.body.amount,
            status: req.body.status,
            userid: req.body.userid
        }).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.MISSING_DETAILS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.DETAILS_ADDED, result));
        });
    });

    app.post('/api/callback/newamount', function (req, res) {
        db.User.findOne({
            where: {
                userid: req.body.userid
            }
        }).then(function (result) {
            var totalpads = utility.checkIfAmount(req.body.amount, req.body.unit);
            var fullname = utility.getFullName(result["firstname"], result["lastname"]);
            db.Callback.create({
                name: fullname,
                city: result["city"],
                mobile: result["mobile"],
                email: result["email"],
                address: result["streetline1"],
                unit: totalpads,
                amount: req.body.amount,
                status: req.body.status,
                userid: req.body.userid
            }).then(function (result1) {
                if (result1==0) 
                    return res.json(response.createResponseObject(constants.FALSE, constants.MISSING_DETAILS, result1)); 
                res.json(response.createResponseObject(constants.TRUE, constants.DETAILS_ADDED, result1));
            });
    });
});
    app.put('/api/callback/update/:id', function (req, res) {
        var totalpads = utility.checkIfAmount(req.body.amount, req.body.unit);
        db.Callback.update({
            name: req.body.name,
            city: req.body.city,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
            unit: totalpads,
            amount: req.body.amount,
            status: req.body.status,
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
    
    app.delete('/api/callback/delete/:id', function (req, res) {
        db.Callback.destroy({
            where: {
                userid: req.params.id
            }        
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAILS_DELETE, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.DETAILS_DELETED, result));
        });
    });


    app.post('/api/callback/accept', function (req, res) {
        var totalpads = utility.checkIfAmount(req.body.amountdonated, req.body.unitdonated);
        db.Account.findAll({
            where: {
                [Op.or]: [{userid: req.body.secondaryid}, {userid: req.body.userid}]
            }
        }).then(function (result) {
            var bid1 = (result[0]["branchid"]);
            var bid2 = (result[1]["branchid"]);
            var rid1 = (result[0]["roleid"]);
            var rid2 = (result[1]["roleid"]);
            db.Roles.findAll({
                where: {
                    [Op.or]: [{roleid: rid1}, {roleid: rid2}]
                }      
            }).then(function (result1){
                var ttype1 = (result1[0]["roletype"]+"-OUT");
                var ttype2 = (result1[1]["roletype"]+"-IN");
                db.Inventory.create({
                    description: req.body.description,
                    donationtype: req.body.donationtype,
                    unitdonated: totalpads,
                    amountdonated: req.body.amountdonated,
                    userid: req.body.secondaryid,
                    branchid: bid1
                    }).then(function (result2) {
                        var iid = (result2["inventoryid"]);
                        var dt = new Date().toISOString().slice(0, 19).replace('T', ' ');
                        db.Transactions.create({
                            transactiontype: ttype1,
                            unitcount: totalpads,
                            transactiondatetime: dt,
                            inventoryid: iid,
                            userid: req.body.secondaryid,
                            branchid: bid1
                            });
                        db.Transactions.create({
                            transactiontype: ttype2,
                            unitcount: totalpads,
                            transactiondatetime: dt,
                            inventoryid: iid,
                            userid: req.body.userid,
                            branchid: bid2
                            })    
                            .then(function (result3) {
                                if (result3==0) 
                                return res.json(response.createResponseObject(constants.FALSE, constants.MISSING_INVENTORY_DETAILS, result3)); 
                            res.json(response.createResponseObject(constants.TRUE, constants.INVENTORY_ADDED, result3));
                        });
                    });
    
            });
            });
        });

        app.post('/api/callback/acceptrec', function (req, res) {
            db.Inventory.findOne({
                where: {
                    inventoryid: req.body.inventoryid
                }
            }).then(function (result2) {
                var totalpads = utility.checkIfAmount(result2["amountdonated"], result2["unitdonated"]);
                db.Account.findAll({
                    where: {
                        [Op.or]: [{userid: req.body.secondaryid}, {userid: req.body.userid}]
                    }
                }).then(function (result) {
                    var bid1 = (result[0]["branchid"]);
                    var bid2 = (result[1]["branchid"]);
                    var rid1 = (result[0]["roleid"]);
                    var rid2 = (result[1]["roleid"]);
                    db.Roles.findAll({
                        where: {
                            [Op.or]: [{roleid: rid1}, {roleid: rid2}]
                        }      
                    }).then(function (result1){
                        var ttype1 = (result1[0]["roletype"]+"-OUT");
                        var ttype2 = (result1[1]["roletype"]+"-IN");
                        var dt = new Date().toISOString().slice(0, 19).replace('T', ' ');
                        db.Transactions.create({
                            transactiontype: ttype1,
                            unitcount: totalpads,
                            transactiondatetime: dt,
                            inventoryid: req.body.inventoryid,
                            userid: req.body.secondaryid,
                            branchid: bid1
                            });
                        db.Transactions.create({
                            transactiontype: ttype2,
                            unitcount: totalpads,
                            transactiondatetime: dt,
                            inventoryid: req.body.inventoryid,
                            userid: req.body.userid,
                            branchid: bid2
                            })    
                            .then(function (result3) {
                                if (result3==0) 
                                return res.json(response.createResponseObject(constants.FALSE, constants.MISSING_INVENTORY_DETAILS, result3)); 
                            res.json(response.createResponseObject(constants.TRUE, constants.INVENTORY_ADDED, result3));
                        });
                    });
                    });
            });
            
            });


        app.get('/api/callback/home', function (req, res) {
            db.Inventory.sum('unitdonated').then(function (padscollected) {
                db.Transactions.sum('unitcount', { where: { transactiontype: "R-IN" }} ).then(function (padsdistributed) {
                    db.Transactions.count({ where: { transactiontype: "R-IN" }, distinct: true, col: 'userid' } ).then(function (girlsbenefitted) {
                        db.Branch.count({ distinct: true, col: 'branchid' } ).then(function (branches) {
                            db.Account.count({ where: { roleid: 2 } , distinct: true, col: 'userid' } ).then(function (volunteers) {
                                db.Account.count({ where: { roleid: 1 } , distinct: true, col: 'userid' } ).then(function (donors) {
                                    var result = {padscollected: padscollected, padsdistributed: padsdistributed, girlsbenefitted: girlsbenefitted, branches: branches, volunteers: volunteers, donors: donors};
                                    if (result==0) 
                                        return res.json(response.createResponseObject(constants.FALSE, constants.NO_DETAIL, result)); 
                                    res.json(response.createResponseObject(constants.TRUE, constants.USER_DETAIL, result));
                                });    
                            });    
                        });
                    });                   
                });            
            });
        });

}
