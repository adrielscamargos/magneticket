const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var horario = require('../model/Horario');

sequelize.sync();

controllers.list = async (req, res) => {
    const data = await horario.findAll()
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
    const {inicio, termino} = req.body;

    const data = await horario.create({
        inicio:inicio,
        termino:termino
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
        message: "Horário criada com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await horario.findAll({
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
    const {inicio, termino } = req.body;
    // Update data
    const data = await horario.update({
        inicio:inicio,
        termino:termino
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
    res.json({success:true, data:data, message:"Horário atualizado com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await horario.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Horário apagado com sucesso."});
  }

module.exports = controllers;