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
      dataLimite:{},
      campWhatsApp: "",
      campUser:""
    }
  }
  

  componentDidMount(){

    const match = matchPath(this.props.history.location.pathname, {
      path: '/editLimite/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    //console.log(userId);
    const url = baseUrl+"/limite/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataLimite:data,
          campWhatsApp:data.whatsapp,
          campUser:data.user
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
            <label htmlFor="inputPassword4">WhatsApp</label>
            <input type="number" className="form-control"  placeholder="1"
              value={this.state.campWhatsApp} onChange={(value)=> this.setState({campWhatsApp:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Usuários</label>
            <input type="number" className="form-control"  placeholder="1"
              value={this.state.campUser} onChange={(value)=> this.setState({campUser:value.target.value})}/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
        {'   '}
        <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Limites</button>
      </div>
    );
  }

  handleClick () {
    this.props.history.push("/listLimite/");
  }

  sendUpdate(){
   
    const match = matchPath(this.props.history.location.pathname, {
      path: '/editLimite/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    
    // parametros de datos post
    const datapost = {
      whatsapp : this.state.campWhatsApp,
      user : this.state.campUser
    }

    axios.post(baseUrl + "/limite/update/"+userId,datapost)
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