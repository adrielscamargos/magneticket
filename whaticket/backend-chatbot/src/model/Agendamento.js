const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'agendamento';

var agendamento = sequelize.define(nametable, {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    mensagem: Sequelize.TEXT('long'),
    destinatario: Sequelize.STRING,
    dataEnvio: Sequelize.DATEONLY,
    horarioEnvio: Sequelize.TIME,
    statusEnvio: {
        type: Sequelize.STRING,
        defaultValue: 'Não enviado'
    }
})

module.exports = agendamento;