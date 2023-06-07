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
     campMsgFrom: ""
   }
 } 

 render(){
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label for="inputEmail4">Status</label>
          <input type="text" className="form-control"  placeholder="ok || off" value={this.state.campStatus} onChange={(value)=> this.setState({campStatus:value.target.value})}/>
        </div>
        <div className="form-group col-md-6">
          <label for="inputEmail4">Usuário</label>
          <input type="text" className="form-control"  placeholder="5535988754197" value={this.state.campMsgFrom} onChange={(value)=> this.setState({campMsgFrom:value.target.value})}/>
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
  else if (this.state.campMsgFrom==="") {
     alert("O campo usuário não pode estar vazio.")
  }
  else {

    const datapost = {
      status : this.state.campStatus,
      msgFrom : this.state.campMsgFrom
    }

    axios.post(baseUrl + "/dialogFlow/create",datapost)
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