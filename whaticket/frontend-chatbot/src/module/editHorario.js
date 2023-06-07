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
      dataHorario:{},
      campInicio: "",
      campTermino:""
    }
  }
  

  componentDidMount(){

    const match = matchPath(this.props.history.location.pathname, {
      path: '/editHorario/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    //console.log(userId);
    const url = baseUrl+"/horario/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataHorario:data,
          campInicio:data.inicio,
          campTermino:data.termino
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
            <label htmlFor="inputPassword4">Início</label>
            <input type="time" className="form-control"  placeholder="Início"
              value={this.state.campInicio} onChange={(value)=> this.setState({campInicio:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Término</label>
            <input type="time" className="form-control"  placeholder="Término"
              value={this.state.campTermino} onChange={(value)=> this.setState({campTermino:value.target.value})}/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
        {'   '}
        <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Horários</button>
      </div>
    );
  }

  handleClick () {
    this.props.history.push("/listHorario/");
  }

  sendUpdate(){
   
    const match = matchPath(this.props.history.location.pathname, {
      path: '/editHorario/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    
    // parametros de datos post
    const datapost = {
      inicio : this.state.campInicio,
      termino : this.state.campTermino
    }

    axios.post(baseUrl + "/horario/update/"+userId,datapost)
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