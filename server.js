var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');
var LoginController = require('./app/controllers/LoginController.js');
var UserController = require('./app/controllers/UserController.js');
var BranchController = require('./app/controllers/BranchController.js');
var InventoryController = require('./app/controllers/InventoryController.js');
var PermissionsController = require('./app/controllers/PermissionsController.js');
var RolesController = require('./app/controllers/RolesController.js');
var AccountController = require('./app/controllers/AccountController.js');
var TransactionsController = require('./app/controllers/TransactionsController.js');
var CallbackController = require('./app/controllers/CallbackController.js');
var PORT = process.env.PORT || 3000;
var tedious = require("tedious");
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//// Static directory
app.use(express.static("app/public"));

LoginController(app, db);
UserController(app, db);
BranchController(app, db);
InventoryController(app, db);
PermissionsController(app, db);
RolesController(app, db);
AccountController(app, db);
TransactionsController(app, db);
CallbackController(app, db);

app.get('/', function (req, res) {

    res.send("App is working");

});


db.sequelize.sync().then(function () {
    app.listen(PORT, function() {
        console.log(`Listening on port ${PORT}`);
    });
});