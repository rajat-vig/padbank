module.exports = function (app, db) {
    // CRUD

    app.get('/api/user/detail/:id', function (req, res) {
        db.User.findOne({
            where: {
                userid: req.params.id
            }
        }).then(function (result) {
            res.json(result);
        });
    });
    
    app.get('/api/user/all', function (req, res) {
        db.User.findAll({}).then(function (result) {
            res.json(result);
        });
    });
    
    app.post('/api/user/new', function (req, res) {
        db.User.create({
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
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
            res.json(result);
        });
    });
    
    app.put('/api/user/update/:id', function (req, res) {
        db.User.update({
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
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
            res.json(result);
        });
    });
    
    app.delete('/api/user/delete/:id', function (req, res) {
        db.User.destroy({
            where: {
                userid: req.params.id
            }        
        }).then(function (result){
            res.json(result);
        });
    })
    
}