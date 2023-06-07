const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'limiteconexoe';

var limiteconexao = sequelize.define(nametable, {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    whatsapp: Sequelize.INTEGER(11),
    user: Sequelize.INTEGER(11)
}) 

module.exports = limiteconexao;