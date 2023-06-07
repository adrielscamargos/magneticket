//import express
const express = require('express');
const app = express();
require("./bootstrap");
const db = require('../src/helpers/DbHelper')

//setting port
app.set('port', process.env.POST || process.env.PORT);

//Middlewares
app.use(express.json());

//cros json
app.use((req, res, next) => {
    //res.header('Access-Control-Allow-Origin', [ process.env.FRONTEND_URL, process.env.CHATBOT_FRONTEND_URL ]);
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

function delay(t, v) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
 }

async function insertDb(){
    const gruposDefault = process.env.GRUPO_DEFAULT;
    const agendamentoDefault = process.env.AGENDAMENTO_AUTOMATICO_DEFAULT;
    const GetGrupo = await db.getGrupo();
    const GetWpp = await db.getWhatsApp();
    const GetLimite = await db.getLimite();
    const GetHorario = await db.getHorario();
    const GetChatbotPadrao = await db.getZDGPadrao();
    if (GetGrupo === false){
        await db.insertGrupo(gruposDefault);
    }
    if (GetWpp === false){
        await db.insertWhatsApp(agendamentoDefault);
    }
    if (GetLimite === false){
        await db.insertLimite();
    }
    if (GetHorario === false){
        await db.insertHorario();
    }
    if (GetChatbotPadrao === false){
        await db.updateZDGPadrao();
    }
    await db.updateChatBot();
    await db.updateDialogFlowAudio();
    await db.updateDialogFlow();
    await db.updateN8N();
    await db.updateWhatsApp();
    await db.updateTag();
    delay(5000).then(async function() {
        await db.alterEnvChatbot(process.env.CHATBOT_DEFAULT);
        await db.alterEnvDialogFlow(process.env.DIALOGFLOW_DEFAULT);
        await db.alterEnvDialogFlowAudio(process.env.DIALOGFLOWAUDIO_DEFAULT);
        await db.alterEnvN8N(process.env.N8N_DEFAULT);
        await db.alterEnvGrupos(process.env.GRUPO_DEFAULT);
        await db.alterEnvWpp(process.env.WHATSAPP_AGENDAMENTO_DEFAULT);
        await db.alterEnvAgendamento(process.env.AGENDAMENTO_AUTOMATICO_DEFAULT);
        console.log('© BOT-ZDG - ENV atualizado')
    });
}

delay(10000).then(function() {
    insertDb();
    console.log('© BOT-ZDG - DB Populado')
});

const tagRouters = require('./routes/TagRoute');
app.use('/tag', tagRouters);

const tagUserRouters = require('./routes/TagUserRoute');
app.use('/taguser', tagUserRouters);

const perguntasRouters = require('./routes/PerguntasRoute');
app.use('/perguntas', perguntasRouters);

const agendamentoRouters = require('./routes/AgendamentoRoute');
app.use('/agendamento', agendamentoRouters);

const agendaStatusRouters = require('./routes/AgendaStatusRoute');
app.use('/agenda', agendaStatusRouters);

const gruposStatusRouters = require('./routes/GruposStatusRoute');
app.use('/grupo', gruposStatusRouters);

const n8nRouters = require('./routes/N8NRoute');
app.use('/n8n', n8nRouters);

const dialogFlowRouters = require('./routes/DialogFlowRoute');
app.use('/dialogFlow', dialogFlowRouters);

const dialogFlowAudioRouters = require('./routes/DialogFlowAudioRoute');
app.use('/dialogFlowAudio', dialogFlowAudioRouters);

const chatBotRouters = require('./routes/ChatBotRoute');
app.use('/chatBot', chatBotRouters);

const horarioRouters = require('./routes/HorarioRoute');
app.use('/horario', horarioRouters);

const limiteRouters = require('./routes/LimiteRoute');
app.use('/limite', limiteRouters);

const protocoloRouters = require('./routes/ProtocoloRoute');
app.use('/protocolo', protocoloRouters);

const whatsAppRouters = require('./routes/WhatsAppRoute');
app.use('/whatsApp', whatsAppRouters);

app.use('/', (req, res) => {
    res.send("© BOT-ZDG - Olá, seja bem vindo a Comunidade ZDG.");
});

app.listen(app.get('port'), () => {
    console.log("© BOT-ZDG - Iniciando o Servidor");
});

