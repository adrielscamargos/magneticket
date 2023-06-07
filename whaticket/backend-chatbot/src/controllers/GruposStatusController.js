const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var grupo = require('../model/GruposStatus');

sequelize.sync();

controllers.list = async (req, res) => {
    const data = await grupo.findAll()
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
    const {status} = req.body;

    const data = await grupo.create({
        status:status
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
        message: "Grupo setado com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await grupo.findAll({
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
    const {status } = req.body;
    // Update data
    const data = await grupo.update({
        status:status
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
    res.json({success:true, data:data, message:"Grupo atualizado com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await grupo.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Grupo apagado com sucesso."});
  }

module.exports = controllers;