import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class EditComponent extends React.Component{

 constructor(props){
   super(props);
   this.state = {
     campStatus: "",
     campNome:"",
     campidWhaticket:"",
   }
 } 

 render(){
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-4">
          <label for="inputEmail4">Status</label>
          <input type="text" className="form-control"  placeholder="ok || off" value={this.state.campStatus} onChange={(value)=> this.setState({campStatus:value.target.value})}/>
        </div>
        <div className="form-group col-md-4">
          <label for="inputEmail4">Nome</label>
          <input type="text" className="form-control"  placeholder="Nome da Conexão" value={this.state.campNome} onChange={(value)=> this.setState({campNome:value.target.value})}/>
        </div>
        <div className="form-group col-md-4">
          <label for="inputEmail4">ID</label>
          <input type="text" className="form-control"  placeholder="ID da Conexão" value={this.state.campidWhaticket} onChange={(value)=> this.setState({campidWhaticket:value.target.value})}/>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Salvar</button>
    </div>
  );
}

sendSave(){

  if (this.state.campStatus==="") {
    alert("O campo status não pode estar vazio.")
  }
  else if (this.state.campNome==="") {
     alert("O campo usuário não pode estar vazio.")
  }
  else if (this.state.campidWhaticket==="") {
    alert("O campo usuário não pode estar vazio.")
  }
  else {

    const datapost = {
      status : this.state.campStatus,
      nome : this.state.campNome,
      idWhaticket: this.state.campidWhaticket
    }

    axios.post(baseUrl + "/whatsApp/create",datapost)
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