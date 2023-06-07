const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var dialogflow = require('../model/DialogFlow');
const DialogFlowHelper = require('../helpers/DialogFlowHelper');
const DialogFlowAudioHelper = require('../helpers/DialogFlowAudioHelper');

sequelize.sync();

controllers.list = async (req, res) => {
    const data = await dialogflow.findAll()
    .then(function(data){
        DialogFlowHelper.updateDialogFlow();
        DialogFlowAudioHelper.updateDialogFlowAudio();
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

    const data = await dialogflow.create({
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
        message: "DialogFlow setado com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await dialogflow.findAll({
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
    const data = await dialogflow.update({
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
    res.json({success:true, data:data, message:"DialogFlow atualizado com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await dialogflow.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"DialogFlow apagado com sucesso."});
  }

module.exports = controllers;