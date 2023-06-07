const controllers = {}

//import model and sequalize

var sequelize = require('../model/database');
var chatbot = require('../model/ChatBot');
const ChatBotHelper = require('../helpers/ChatBotHelper');

sequelize.sync();

controllers.list = async (req, res) => {
    const data = await chatbot.findAll()
    .then(function(data){
        ChatBotHelper.updateChatBot()
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

    const data = await chatbot.create({
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
        message: "Chatbot setado com sucesso.",
        data: data
    })
}

controllers.get = async(req, res) => {
    const { id } = req.params;

    const data  = await chatbot.findAll({
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
    const data = await chatbot.update({
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
    res.json({success:true, data:data, message:"ChatBot atualizado com sucesso"});
  }

  controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await chatbot.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"ChatBot apagado com sucesso."});
  }

module.exports = controllers;