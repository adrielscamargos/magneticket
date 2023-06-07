const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var limite = require('../model/Limite');

sequelize.sync();

controllers.list = async (req, res) => {
    const data = await limite.findAll()
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
    const {whatsapp, user} = req.body;

    const data = await limite.create({
        whatsapp:whatsapp,
        user:user
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
        message: "Limite criado com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await limite.findAll({
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
    const {whatsapp, user } = req.body;
    // Update data
    const data = await limite.update({
        whatsapp:whatsapp,
        user:user
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
    res.json({success:true, data:data, message:"Limite atualizado com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await limite.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Limite apagado com sucesso."});
  }

module.exports = controllers;