import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Form from './module/form';
import List from './module/list';
import Edit from './module/edit';
import FormAgendamento from './module/formAgendamento';
import EditAgendamento from './module/editAgendamento';
import ListAgendamento from './module/listAgendamento';
import CSVPergunta from './module/csvPergunta';
import CSVAgendamento from './module/csvAgendamento';
import ListDialogFlow from './module/listDialogFlow';
import EditDialogFlow from './module/editDialogFlow';
import FormDialogFlow from './module/formDialogFlow';
import ListChatBot from './module/listChatBot';
import EditChatBot from './module/editChatBot';
import FormChatBot from './module/formChatBot';
import ListHorario from './module/listHorario';
import EditHorario from './module/editHorario';
import FormHorario from './module/formHorario';
import ListLimite from './module/listLimite';
import EditLimite from './module/editLimite';
import FormLimite from './module/formLimite';
import ListProtocolo from './module/listProtocolo';
import EditProtocolo from './module/editProtocolo';
import FormProtocolo from './module/formProtocolo';
import ListWhatsApp from './module/listWhatsApp';
import EditWhatsApp from './module/editWhatsApp';
import FormWhatsApp from './module/formWhatsApp';
import ListStatusAgendamento from './module/listSAgendamento';
import EditStatusAgendamento from './module/editSAgendamento';
import FormStatusAgendamento from './module/formSAgendamento';
import ListGrupo from './module/listGrupo';
import EditGrupo from './module/editGrupo';
import FormGrupo from './module/formGrupo';
import ListN8N from './module/listN8N';
import EditN8N from './module/editN8N';
import FormN8N from './module/formN8N';
import ListTag from './module/listTag';
import EditTag from './module/editTag';
import FormTag from './module/formTag';
import ListTagDisparo from './module/listTagDisparo';
import ListTagDisparoMidia from './module/listTagDisparoMidia';
import ListTagDisparoRecord from './module/listTagDisparoRecord';
import ListTagAgendamento from './module/listTagAgendamento';


function App() {
  return (
    <Router>
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://xn--magnetrontelecomunicaes-ibc46a.com.br" style={{color:'orange',fontWeight:'bold'}}>Magnetron Telecomunicações</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
	  <div></div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link style={{margin:'2px'}} className="btn btn-info" to="/">Perguntas</Link>
                  {'   '}
                  {/* <Link classname="btn btn-info" to="/form">Adicionar Perguntas</Link>
                  {'   '}
                  <Link classname="btn btn-info" to="/csvPergunta">Importar Perguntas</Link>
                  {'   '} */}
                  <Link style={{margin:'2px'}} className="btn btn-info" to="/listAgendamento">Agendamentos</Link>
                  {'   '}
                  {/* <Link classname="btn btn-info" to="/listWhatsApp">WhatsApp</Link>
                  {'   '} */}
                  {/* <Link classname="btn btn-info" to="/formAgendamento">Adicionar Agendamento</Link>
                  {'   '}
                  <Link classname="btn btn-info" to="/csvAgendamento">Importar Agendamento</Link>
                  {'   '} */}
                  <Link style={{margin:'2px'}} className="btn btn-info " to="/listGrupo">Grupos</Link>
                  {'   '}
                  <Link style={{margin:'2px'}} className="btn btn-info" to="/listProtocolo">Protocolos</Link>
                  {'   '}
                  {/* <Link classname="btn btn-info " to="/formProtocolo">Adicionar Protocolo</Link>
                  {'   '} */}
                  <Link style={{margin:'2px'}} className="btn btn-info" to="/listHorario">Horários</Link>
                  {'   '}
                  <Link style={{margin:'2px'}} className="btn btn-info" to="/listLimite">Limites</Link>
                  {'   '}
                  <Link style={{margin:'2px'}} className="btn btn-info" to="/listDialogFlow">DialogFlow</Link>
                  {'   '}
                  <Link style={{margin:'2px'}} className="btn btn-info" to="/listChatBot">ChatBot</Link>
                  {'   '}
                  <Link style={{margin:'2px'}} className="btn btn-info " to="/listN8N">N8N</Link>
                  {'   '}
                  <Link style={{margin:'2px'}} className="btn btn-info " to="/listTag">Tags</Link>
                  {/* {'   '}
                  <Link style={{margin:'2px'}} className="btn btn-info " to="/listTagDisparo">Tag Disparo</Link> */}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container py-4">
            <div className="row">
              <Route path="/" exact component={List} />
              <Route path="/form" component={Form} />
              <Route path="/edit/:perguntasId" component={Edit} />
              <Route path="/listAgendamento" exact component={ListAgendamento} />
              <Route path="/formAgendamento" component={FormAgendamento} />
              <Route path="/csvPergunta" component={CSVPergunta} />
              <Route path="/csvAgendamento" component={CSVAgendamento} />
              <Route path="/editAgendamento/:perguntasId" component={EditAgendamento} />
              <Route path="/listDialogFlow" exact component={ListDialogFlow} />
              <Route path="/editDialogFlow/:dialogId" exact component={EditDialogFlow} />
              <Route path="/formDialogFlow" exact component={FormDialogFlow} />
              <Route path="/listChatBot" exact component={ListChatBot} />
              <Route path="/editChatBot/:chatbotId" exact component={EditChatBot} />
              <Route path="/formChatBot" exact component={FormChatBot} />
              <Route path="/listHorario" exact component={ListHorario} />
              <Route path="/editHorario/:horarioId" exact component={EditHorario} />
              <Route path="/formHorario" exact component={FormHorario} />
              <Route path="/listLimite" exact component={ListLimite} />
              <Route path="/editLimite/:limiteId" exact component={EditLimite} />
              <Route path="/formLimite" exact component={FormLimite} />
              <Route path="/listProtocolo" exact component={ListProtocolo} />
              <Route path="/editProtocolo/:protocoloId" exact component={EditProtocolo} />
              <Route path="/formProtocolo" exact component={FormProtocolo} />
              <Route path="/listWhatsApp" exact component={ListWhatsApp} />
              <Route path="/editWhatsApp/:protocoloId" exact component={EditWhatsApp} />
              <Route path="/formWhatsApp" exact component={FormWhatsApp} />
              <Route path="/listAgenda" exact component={ListStatusAgendamento} />
              <Route path="/editAgenda/:agId" exact component={EditStatusAgendamento} />
              <Route path="/formAgenda" exact component={FormStatusAgendamento} />
              <Route path="/listGrupo" exact component={ListGrupo} />
              <Route path="/editGrupo/:limiteId" exact component={EditGrupo} />
              <Route path="/formGrupo" exact component={FormGrupo} />
              <Route path="/listN8N" exact component={ListN8N} />
              <Route path="/editN8N/:dialogId" exact component={EditN8N} />
              <Route path="/formN8N" exact component={FormN8N} />
              <Route path="/listTag" exact component={ListTag} />
              <Route path="/editTag/:tagId" exact component={EditTag} />
              <Route path="/formTag" exact component={FormTag} />
              <Route path="/listTagDisparo" exact component={ListTagDisparo} />
              <Route path="/listTagDisparoMidia" exact component={ListTagDisparoMidia} />
              <Route path="/listTagDisparoRecord" exact component={ListTagDisparoRecord} />
              <Route path="/listTagAgendamento" exact component={ListTagAgendamento} />
            </div>
          </div>
      </div>
      </Router>
  );
}

export default App;
