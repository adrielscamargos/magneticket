import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';

import { matchPath } from 'react-router'

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class EditComponent extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      dataAgenda:{},
      campMensagem: "",
      campDestinatario:"",
      campDataEnvio:"",
      campHorarioEnvio:""
    }
  }
  

  componentDidMount(){

    const match = matchPath(this.props.history.location.pathname, {
      path: '/editAgendamento/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    //console.log(userId);
    const url = baseUrl+"/agendamento/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataAgenda:data,
          campMensagem:data.mensagem,
          campDestinatario:data.destinatario,
          campDataEnvio:data.dataEnvio,
          campHorarioEnvio:data.horarioEnvio
        })
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }

  render(){
    return (
      <div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-12">
          <label htmlFor="inputPassword4">Mensagem </label>
          {/* <input type="text" className="form-control"  placeholder="Mensagem" value={this.state.campMensagem} onChange={(value)=> this.setState({campMensagem:value.target.value})}/> */}
          <textarea 
          className="form-control"
					name="campMensagem" 
					cols="40" 
					rows="5"
					value={this.state.campMensagem} 
					onChange={(value)=> this.setState({campMensagem:value.target.value})}
					required="required"
					placeholder="Olá, tudo bem?&#13;&#10;Como posso te ajudar?&#13;&#10;Abraços, a gente se vê!"
				></textarea>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputEmail4">Destinatario</label>
            <input type="text" className="form-control"  placeholder="Destinatário"
              value={this.state.campDestinatario} onChange={(value)=> this.setState({campDestinatario:value.target.value})}/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputEmail4">Data de Envio</label>
            <input type="date" className="form-control"  placeholder="Data de Envio"
              value={this.state.campDataEnvio} onChange={(value)=> this.setState({campDataEnvio:value.target.value})}/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputEmail4">Horário de Envio</label>
            <input type="time" className="form-control"  placeholder="Data de Envio"
              value={this.state.campHorarioEnvio} onChange={(value)=> this.setState({campHorarioEnvio:value.target.value})}/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
        {'   '}
        <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Agendamentos</button>
      </div>
    );
  }

  handleClick () {
    this.props.history.push("/listAgendamento");
  }

  sendUpdate(){
   
    const match = matchPath(this.props.history.location.pathname, {
      path: '/editAgendamento/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    
    // parametros de datos post
    const datapost = {
      mensagem : this.state.campMensagem,
      destinatario : this.state.campDestinatario,
      dataEnvio : this.state.campDataEnvio,
      horarioEnvio: this.state.campHorarioEnvio
    }

    axios.post(baseUrl + "/agendamento/update/"+userId,datapost)
    .then(response=>{
      if (response.data.success===true) {
        alert(response.data.message)
      }
      else {
        alert("Error")
      }
    }).catch(error=>{
      alert("Error 34 "+error)
    })

   }

}


export default EditComponent;