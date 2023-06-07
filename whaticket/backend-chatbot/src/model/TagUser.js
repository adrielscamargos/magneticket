const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'tagcontact';

var tag = sequelize.define(nametable, {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    usuario: Sequelize.STRING,
    tag: {
      type: Sequelize.STRING,
      defaultValue: 'Sem Tags'
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

module.exports = tag;