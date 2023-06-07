const dbConfig = require("../config/database");
var Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;