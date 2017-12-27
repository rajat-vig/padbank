module.exports = function (app, db) {
    // CRUD
    
    app.get('/api/branch/detail/:id', function (req, res) {
        db.Branch.findById(req.params.id).then(function (result) {
            res.json(result);
        });
    });

    app.get('/api/branch/all', function (req, res) {
        db.Branch.findAll({}).then(function (result) {
            res.json(result);
        });
    });
    
    app.post('/api/branch/new', function (req, res) {
        db.Branch.create({
            name: req.body.name,
            state: req.body.state,
            district: req.body.district,
            city: req.body.city,
            pincode: req.body.pincode,
            subbranchid: req.body.subbranchid
        }).then(function (result) {
            res.json(result);
        });
    });
    
    app.put('/api/branch/update/:id', function (req, res) {
        db.Branch.update({
            name: req.body.name,
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
            res.json(result);
        });
    });
    
    app.delete('/api/branch/delete/:id', function (req, res) {
        db.Branch.destroy({
            where: {
                branchid: req.params.id
            }        
        }).then(function (result){
            res.json(result);
        });
    })
    
}