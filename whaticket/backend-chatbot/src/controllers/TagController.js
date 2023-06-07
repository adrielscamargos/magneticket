const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var tags = require('../model/Tag');

sequelize.sync();

controllers.list = async (req, res) => {
    const data = await tags.findAll()
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
    const {tag, color} = req.body;

    const data = await tags.create({
        tag:tag,
        color:color
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
        message: "Tag criada com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await tags.findAll({
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
    const {tag, color } = req.body;
    // Update data
    const data = await tags.update({
        tag:tag,
        color:color
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
    res.json({success:true, data:data, message:"Tag atualizada com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await tags.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Tag apagada com sucesso."});
  }

module.exports = controllers;