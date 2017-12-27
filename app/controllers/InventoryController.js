module.exports = function (app, db) {
    // CRUD
    
    app.get('/api/inventory/:id', function (req, res) {
        db.Inventory.findById(req.params.id).then(function (result) {
            res.json(result);
        });
    });

    app.get('/api/inventory/all', function (req, res) {
        db.Inventory.findAll({}).then(function (result) {
            res.json(result);
        });
    });
    
    app.post('/api/inventory/new', function (req, res) {
        var totalpads = checkIfAmount(req.body.amountdonated, req.body.unitdonated);
        db.Inventory.create({
            description: req.body.description,
            donationtype: req.body.donationtype,
            unitdonated: totalpads,
            amountdonated: req.body.amountdonated 
               }).then(function (result) {
            res.json(result);
        });
    });
    
    app.put('/api/inventory/update/:id', function (req, res) {
        db.Inventory.update({
            username: req.body.username,
            passwordhash: req.body.passwordhash,
            activeuser: req.body.activeuser
        }, 
        {
            where: {
                inventoryid: req.params.id
            }
        }).then(function (result){
            res.json(result);
        });
    });
    
    app.delete('/api/inventory/delete/:id', function (req, res) {
        db.Inventory.destroy({
            where: {
                inventoryid: req.params.id
            }        
        }).then(function (result){
            res.json(result);
        });
    })
    
}

function checkIfAmount(amount, pads) {
    if(amount)
        return amount/10;
    else
        return pads;
}