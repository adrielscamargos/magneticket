import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class EditComponent extends React.Component{

 constructor(props){
   super(props);
   this.state = {
     campWhatsApp: "",
     campUser: ""
   }
 } 

 render(){
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label for="inputPassword4">WhatsApp </label>
          <input type="number" className="form-control"  placeholder="WhatsApp" value={this.state.campWhatsApp} onChange={(value)=> this.setState({campWhatsApp:value.target.value})}/>
        </div>
        <div className="form-group col-md-6">
          <label for="inputEmail4">Usuário</label>
          <input type="number" className="form-control"  placeholder="Usuário" value={this.state.campUser} onChange={(value)=> this.setState({campUser:value.target.value})}/>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Salvar</button>
    </div>
  );
}

sendSave(){

  if (this.state.campWhatsApp==="") {
    alert("O campo whatsapp não pode estar vazio.")
  }
  else if (this.state.campUser==="") {
     alert("O campo usuário não pode estar vazio.")
  }
  else {

    const datapost = {
      whatsapp : this.state.campWhatsApp,
      user : this.state.campUser
    }

    axios.post(baseUrl + "/limite/create",datapost)
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