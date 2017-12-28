'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'production';
var config    = require(__dirname + '/../config/config.json')[env];
var db = {};
var tedious = require("tedious");


if (config.use_env_variable) {
    
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    console.log("Env: " + env);
    console.log("Env: " + config.user);
    var sequelize = new Sequelize('pd-bankDB', 'DbServerAdmin', 'Delhi@0063', {
        host: 'pd-bankdb.database.windows.net',
        dialect: 'mssql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        "dialectOptions": {
            "encrypt": true
        }
    });
}



fs
  .readdirSync(__dirname)
    .filter(file => {
        console.log("file: "+file)
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
      console.log("__dirname:" + __dirname);
      console.log("fiename:" + file);
      if (true) {
          var model = sequelize['import'](path.join(__dirname, file));
          db[model.name] = model;
          console.log("midel name: " + db[model.name]);
      }

  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
