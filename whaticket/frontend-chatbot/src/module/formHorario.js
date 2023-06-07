import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class EditComponent extends React.Component{

 constructor(props){
   super(props);
   this.state = {
     campInicio: "",
     campTermino: ""
   }
 } 

 render(){
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label for="inputPassword4">Início </label>
          <input type="time" className="form-control"  placeholder="Início" value={this.state.campInicio} onChange={(value)=> this.setState({campInicio:value.target.value})}/>
        </div>
        <div className="form-group col-md-6">
          <label for="inputEmail4">Término</label>
          <input type="time" className="form-control"  placeholder="Término" value={this.state.campTermino} onChange={(value)=> this.setState({campTermino:value.target.value})}/>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Salvar</button>
    </div>
  );
}

sendSave(){

  if (this.state.campInicio==="") {
    alert("O campo início não pode estar vazio.")
  }
  else if (this.state.campTermino==="") {
     alert("O campo término não pode estar vazio.")
  }
  else {

    const datapost = {
      inicio : this.state.campInicio,
      termino : this.state.campTermino
    }

    axios.post(baseUrl + "/horario/create",datapost)
    .then(response=>{
      if (response.data.success===true) {
        alert(response.data.message)
      }
      else {
        alert(response.data.message)
      }
    }).catch(error=>{
      alert("Error 34 "+ error)
    })

  }

}

}


export default EditComponent;