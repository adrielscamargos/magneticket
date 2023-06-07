const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'statuswhatsapp';

var statuswhatsapp = sequelize.define(nametable, {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: process.env.WHATSAPP_AGENDAMENTO_DEFAULT || 'off'
    },
    nome: Sequelize.STRING,
    idWhaticket: Sequelize.STRING,
    controle:{
        type:Sequelize.INTEGER,
        defaultValue: 0
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

module.exports = statuswhatsapp;