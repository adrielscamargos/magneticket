const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'tag';

var tag = sequelize.define(nametable, {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    tag: Sequelize.STRING,
    color: Sequelize.STRING,
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