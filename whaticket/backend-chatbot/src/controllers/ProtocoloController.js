const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var protocolo = require('../model/Protocolo');

sequelize.sync();

controllers.list = async (req, res) => {
    const data = await protocolo.findAll()
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
    const {usuario, protocolo} = req.body;

    const data = await protocolo.create({
        usuario:usuario,
        protocolo:protocolo
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
        message: "Protocolo criado com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await protocolo.findAll({
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
    const {usuario, protocolo } = req.body;
    // Update data
    const data = await protocolo.update({
        usuario:usuario,
        protocolo:protocolo
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
    res.json({success:true, data:data, message:"Protocolo atualizado com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await protocolo.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Protocolo apagado com sucesso."});
  }

module.exports = controllers;