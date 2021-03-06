'use strict'

var fs = require('fs');
var path = require('path');
var Sequelize = require("sequelize");
var Sequelize = require('sequelize');

var sequelize = new Sequelize('dbname','root','password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;


var db = {};

fs.readdirSync(__dirname)
.filter(function(file) {
    return (file.indexOf('.') !== 0) && (file != 'index.js');
})
.forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
