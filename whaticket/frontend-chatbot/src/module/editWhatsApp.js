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
      dataWhatsApp:{},
      campStatus: "",
      campNome:"",
      campidWhaticket:"",
    }
  }
  

  componentDidMount(){

    const match = matchPath(this.props.history.location.pathname, {
      path: '/editWhatsApp/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    //console.log(userId);
    const url = baseUrl+"/whatsApp/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataWhatsApp:data,
          campStatus:data.status,
          campNome:data.nome,
          campidWhaticket:data.idWhaticket
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
          <div className="form-group col-md-4">
            <label htmlFor="inputEmail4">Status</label>
            {/* <input type="text" className="form-control"  placeholder="ok || off"
              value={this.state.campStatus} onChange={(value)=> this.setState({campStatus:value.target.value})}/> */}
              <select className="form-control" value={this.state.campStatus} onChange={(value)=> this.setState({campStatus:value.target.value})}>
                <option value='ok'>Ligado</option>
                <option value='off'>Desligado</option>
              </select>
          </div>
          {/* <div className="form-group col-md-4">
            <label htmlfor="inputEmail4">Nome da conexão</label>
            <input type="text" className="form-control"  placeholder="Nome da conexão"
              value={this.state.campNome} onChange={(value)=> this.setState({campNome:value.target.value})}/>
          </div> */}
          <div className="form-group col-md-4">
            <label htmlFor="inputEmail4">Nome da conexão</label>
            <input type="text" className="form-control"  placeholder="Nome da conexão" value={this.state.campNome} readOnly/>
          </div>
          {/* <div className="form-group col-md-4">
            <label htmlfor="inputEmail4">ID da conexão</label>
            <input type="text" className="form-control"  placeholder="ID da conexão"
              value={this.state.campidWhaticket} onChange={(value)=> this.setState({campidWhaticket:value.target.value})}/>
          </div> */}
          <div className="form-group col-md-4">
            <label htmlFor="inputEmail4">ID da conexão</label>
            <input type="text" className="form-control"  placeholder="ID da conexão" value={this.state.campidWhaticket} readOnly/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
        {'   '}
        <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Status</button>
      </div>
    );
  }

  handleClick () {
    this.props.history.push("/listWhatsApp/");
  }

  sendUpdate(){
   
    const match = matchPath(this.props.history.location.pathname, {
      path: '/editWhatsApp/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    
    // parametros de datos post
    const datapost = {
      status : this.state.campStatus,
      nome: this.state.campNome,
      idWhaticket: this.state.campidWhaticket

    }

    axios.post(baseUrl + "/whatsApp/update/"+userId,datapost)
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