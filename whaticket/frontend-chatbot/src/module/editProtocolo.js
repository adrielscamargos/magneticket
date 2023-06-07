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
      dataProtocolo:{},
      campUsuario: "",
      campProtocolo:"",
    }
  }
  

  componentDidMount(){

    const match = matchPath(this.props.history.location.pathname, {
      path: '/editProtocolo/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    //console.log(userId);
    const url = baseUrl+"/protocolo/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataProtocolo:data,
          campUsuario:data.usuario,
          campProtocolo:data.protocolo
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
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Protocolo</label>
            <input type="text" className="form-control"  placeholder="165483189151489"
              value={this.state.campProtocolo} onChange={(value)=> this.setState({campProtocolo:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Usuário</label>
            <input type="text" className="form-control"  placeholder="553588754197"
              value={this.state.campUsuario} onChange={(value)=> this.setState({campUsuario:value.target.value})}/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
      </div>
    );
  }

  sendUpdate(){
   
    const match = matchPath(this.props.history.location.pathname, {
      path: '/editProtocolo/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    
    // parametros de datos post
    const datapost = {
      protocolo : this.state.campProtocolo,
      usuario : this.state.campUsuario
    }

    axios.post(baseUrl + "/protocolo/update/"+userId,datapost)
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