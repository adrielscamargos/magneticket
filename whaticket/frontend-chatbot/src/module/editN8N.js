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
      dataN8N:{},
      campStatus: "",
      campMsgFrom:"",
    }
  }
  

  componentDidMount(){

    const match = matchPath(this.props.history.location.pathname, {
      path: '/editn8n/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    //console.log(userId);
    const url = baseUrl+"/n8n/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataN8N:data,
          campStatus:data.status,
          campMsgFrom:data.msgFrom
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
            <label htmlFor="inputEmail4">Status</label>
            {/* <input type="text" className="form-control"  placeholder="ok || off"
              value={this.state.campStatus} onChange={(value)=> this.setState({campStatus:value.target.value})}/> */}
              <select className="form-control" value={this.state.campStatus} onChange={(value)=> this.setState({campStatus:value.target.value})}>
                <option value='ok'>Ligado</option>
                <option value='off'>Desligado</option>
              </select>
          </div>
          {/* <div className="form-group col-md-6">
            <label htmlfor="inputEmail4">Usuário</label>
            <input type="text" className="form-control"  placeholder="553588754197"
              value={this.state.campMsgFrom} onChange={(value)=> this.setState({campMsgFrom:value.target.value})}/>
          </div> */}
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Usuário</label>
            <input type="text" className="form-control"  placeholder="553588754197"
              defaultValue={this.state.campMsgFrom}/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
        {'   '}
        <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Status</button>
      </div>
    );
  }

  handleClick () {
    this.props.history.push("/listN8N/");
  }

  sendUpdate(){
   
    const match = matchPath(this.props.history.location.pathname, {
      path: '/editN8N/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    
    // parametros de datos post
    const datapost = {
      status : this.state.campStatus,
      msgFrom : this.state.campMsgFrom
    }

    axios.post(baseUrl + "/n8n/update/"+userId,datapost)
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