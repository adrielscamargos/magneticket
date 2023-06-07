import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class EditComponent extends React.Component{

 constructor(props){
   super(props);
   this.state = {
     campStatus: ""
   }
 } 

 render(){
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label for="inputEmail4">Status</label>
          <select className="form-control" value={this.state.campStatus} onChange={(value)=> this.setState({campStatus:value.target.value})}>
                <option value='ok'>Ligado</option>
                <option value='off'>Desligado</option>
              </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Salvar</button>
      {'   '}
      <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Controles</button>
    </div>
  );
}

handleClick () {
  this.props.history.push("/listAgenda");
}

sendSave(){

  if (this.state.campStatus==="") {
    alert("O campo status não pode estar vazio.")
  }
  else {

    const datapost = {
      status : this.state.campStatus
    }

    axios.post(baseUrl + "/agenda/create",datapost)
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