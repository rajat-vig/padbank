module.exports = function (app, db) {
    // CRUD
    
    app.get('/api/all', function (req, res) {
        db.Login.findAll({}).then(function (result) {
            res.json(result);
        });
    });
    
    app.post('/api/new', function (req, res) {
        db.Login.create({
            username: req.body.username,
            passwordhash: req.body.passwordhash,
            activeuser: req.body.activeuser
        }).then(function (result) {
            res.json(result);
        });
    });
    
    app.put('/api/update/:id', function (req, res) {
        db.Login.update({
            username: req.body.username,
            passwordhash: req.body.passwordhash,
            activeuser: req.body.activeuser
        }, 
        {
            where: {
                userid: req.params.id
            }
        }).then(function (result){
            res.json(result);
        });
    });
    
    app.delete('/api/delete/:id', function (req, res) {
        db.Login.destroy({
            where: {
                userid: req.params.id
            }        
        }).then(function (result){
            res.json(result);
        });
    })
    
}