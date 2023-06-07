const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var whatsapp = require('../model/WhatsApp');

sequelize.sync();

controllers.list = async (req, res) => {
    const data = await whatsapp.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    })

    res.json({
        success: true,
        data: data
    });
}

controllers.create = async(req, res) => {
    const {status, nome, idWhaticket, controle} = req.body;

    const data = await whatsapp.create({
        status:status,
        nome:nome,
        idWhaticket:idWhaticket,
        controle:controle
    })
    .then(function(data){
        return data;
    })
    .catch(error=>{
        console.log(error);
        return error;
    })

    res.status(200).json({
        success: true,
        message: "WhatsApp setado com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await whatsapp.findAll({
        where: {id : id}
    })
    .then(function(data){
        return data;
    })
    .catch(error=>{
        console.log(error);
        return error;
    })

    res.json({
        success:true,
        data: data
    })
}

controllers.update = async (req,res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const {status, nome, idWhaticket, controle } = req.body;
    // Update data
    const data = await whatsapp.update({
        status:status,
        nome:nome,
        idWhaticket:idWhaticket,
        controle:controle
    },
    {
      where: { id: id}
    })
    .then( function(data){
      return data;
    })
    .catch(error => {
      return error;
    }) 
    res.json({success:true, data:data, message:"WhatsApp atualizado com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await whatsapp.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Whatsapp apagado com sucesso."});
  }

module.exports = controllers;