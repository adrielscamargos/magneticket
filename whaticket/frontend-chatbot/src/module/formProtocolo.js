import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class EditComponent extends React.Component{

 constructor(props){
   super(props);
   this.state = {
     campProtocolo: "",
     campUsuario: ""
   }
 } 

 render(){
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label for="inputEmail4">Protocolo</label>
          <input type="text" className="form-control"  placeholder="16535419865156" value={this.state.campProtocolo} onChange={(value)=> this.setState({campProtocolo:value.target.value})}/>
        </div>
        <div className="form-group col-md-6">
          <label for="inputEmail4">Usuário</label>
          <input type="text" className="form-control"  placeholder="5535988754197" value={this.state.campUsuario} onChange={(value)=> this.setState({campUsuario:value.target.value})}/>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Salvar</button>
    </div>
  );
}

sendSave(){

  if (this.state.campProtocolo==="") {
    alert("O campo status não pode estar vazio.")
  }
  else if (this.state.campUsuario==="") {
     alert("O campo usuário não pode estar vazio.")
  }
  else {

    const datapost = {
      protocolo : this.state.campProtocolo,
      usuario : this.state.campUsuario
    }

    axios.post(baseUrl + "/protocolo/create",datapost)
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