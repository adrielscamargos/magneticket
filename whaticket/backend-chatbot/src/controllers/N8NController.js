const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var n8n = require('../model/N8N');
const N8NHelper = require('../helpers/N8NHelper');
sequelize.sync();

controllers.list = async (req, res) => {
    const data = await n8n.findAll()
    .then(function(data){
        N8NHelper.updateN8N();
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
    const {status, msgFrom} = req.body;

    const data = await n8n.create({
        status:status,
        msgFrom:msgFrom
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
        message: "N8N setado com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await n8n.findAll({
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
    const {status, msgFrom } = req.body;
    // Update data
    const data = await n8n.update({
        status:status,
        msgFrom:msgFrom
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
    res.json({success:true, data:data, message:"N8N atualizado com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await n8n.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"N8N apagado com sucesso."});
  }

module.exports = controllers;