const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'statusgrupo';

var statusgrupo = sequelize.define(nametable, {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: process.env.GRUPO_DEFAULT || 'off'
    },
    createdAt:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
    updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
}) 

module.exports = statusgrupo;