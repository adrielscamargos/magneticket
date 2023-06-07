const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'dialogFlowaudio';

var dialogflowaudio = sequelize.define(nametable, {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: process.env.DIALOGFLOWAUDIO_DEFAULT || 'off'
    },
    msgFrom: Sequelize.STRING,
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

module.exports = dialogflowaudio;