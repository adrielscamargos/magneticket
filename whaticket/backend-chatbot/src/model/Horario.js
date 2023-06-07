const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'horariochatbot';

var horario = sequelize.define(nametable, {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    inicio: Sequelize.TIME(0),
    termino: Sequelize.TIME(0)
}) 

module.exports = horario;