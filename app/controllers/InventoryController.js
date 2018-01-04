var constants = require('../../constants');
var response = require('../../response');
var utility = require('../../utilities');
module.exports = function (app, db) {
    // CRUD
    
    app.get('/api/inventory/detail/inventorydetail/:id', function (req, res) {
        db.Inventory.findAll({
            where: {
                inventoryid: req.params.id
            },
            include: [{model: db.Login}]
        }).then(function (result) {
            res.json(response.createResponseObject(result));
        });
    });

    app.post('/api/inventory/add', function (req, res) {
        var totalpads = utility.checkIfAmount(req.body.amountdonated, req.body.unitdonated);
        db.Account.find({
            where: {
                userid: req.body.userid
            }
        }).then(function (result) {
            var bid = (result["branchid"]);
            db.Inventory.create({
                description: req.body.description,
                donationtype: req.body.donationtype,
                unitdonated: totalpads,
                amountdonated: req.body.amountdonated,
                userid: req.body.userid,
                branchid: bid
                }).then(function (result2) {
                    var iid = (result2["inventoryid"]);
                    console.log(result2["inventoryid"]);
                    console.log(new Date());
                    var dt = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    db.Transactions.create({
                        transactiontype: req.body.transactiontype,
                        unitcount: req.body.unitdonated,
                        transactiondatetime: dt,
                        inventoryid: iid,
                        userid: req.body.userid,
                        branchid: bid
                        })    
                        .then(function (result3) {
                            if (result3==0) 
                            return res.json(response.createResponseObject(constants.FALSE, constants.MISSING_INVENTORY_DETAILS, result3)); 
                        res.json(response.createResponseObject(constants.TRUE, constants.INVENTORY_ADDED, result3));
                    });
                });
            });
        });


    app.get('/api/inventory/detail/:id', function (req, res) {
        db.Inventory.findById(req.params.id).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_INVENTORY, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.INVENTORY_FOUND, result));
        });
    });

    app.get('/api/inventory/all', function (req, res) {
        db.Inventory.findAll({}).then(function (result) {
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.NO_INVENTORIES, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.INVENTORIES_FOUND, result));
        });
    });
    
    app.post('/api/inventory/new', function (req, res) {
        var totalpads = utility.checkIfAmount(req.body.amountdonated, req.body.unitdonated);
        db.Inventory.create({
            description: req.body.description,
            donationtype: req.body.donationtype,
            unitdonated: totalpads,
            amountdonated: req.body.amountdonated,
            userid: req.body.userid,
            branchid: req.body.branchid 
               }).then(function (result) {
                if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.MISSING_INVENTORY_DETAILS, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.INVENTORY_ADDED, result));
        });
    });
    
    app.put('/api/inventory/update/:id', function (req, res) {
        var totalpads = utility.checkIfAmount(req.body.amountdonated, req.body.unitdonated);
        db.Inventory.update({
            description: req.body.description,
            donationtype: req.body.donationtype,
            unitdonated: totalpads,
            amountdonated: req.body.amountdonated,
            userid: req.body.userid,
            branchid: req.body.branchid
        }, 
        {
            where: {
                inventoryid: req.params.id
            }
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.INVENTORY_NOT_UPDATED, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.INVENTORY_UPDATED, result));
        });
    });
    
    app.delete('/api/inventory/delete/:id', function (req, res) {
        db.Inventory.destroy({
            where: {
                inventoryid: req.params.id
            }        
        }).then(function (result){
            if (result==0) 
                return res.json(response.createResponseObject(constants.FALSE, constants.INVENTORY_NOT_DELETED, result)); 
            res.json(response.createResponseObject(constants.TRUE, constants.INVENTORY_DELETED, result));
        });
    })
    
}
