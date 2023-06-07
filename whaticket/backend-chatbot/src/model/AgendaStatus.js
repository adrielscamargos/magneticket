const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'agstatuswhatsapp';

var agendastatus = sequelize.define(nametable, {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: process.env.AGENDAMENTO_AUTOMATICO_DEFAULT || 'off'
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

module.exports = agendastatus;