import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class EditComponent extends React.Component{

 constructor(props){
   super(props);
   this.state = {
     campPergunta: "",
     campResposta: ""
   }
 } 

 render(){
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Pergunta </label>
          {/* <input type="text" classname="form-control"  placeholder="Pergunta" value={this.state.campPergunta} onChange={(value)=> this.setState({campPergunta:value.target.value})}/> */}
          <textarea 
          className="form-control"
					name="campPergunta" 
					cols="40" 
					rows="5"
					value={this.state.campPergunta} 
					onChange={(value)=> this.setState({campPergunta:value.target.value})}
					required="required"
					placeholder="Olá, tudo bem?&#13;&#10;Como posso te ajudar?&#13;&#10;Abraços, a gente se vê!"
				></textarea>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Resposta</label>
          {/* <input type="text" classname="form-control"  placeholder="Resposta" value={this.state.campResposta} onChange={(value)=> this.setState({campResposta:value.target.value})}/> */}
          <textarea 
          className="form-control"
					name="campResposta" 
					cols="40" 
					rows="5"
					value={this.state.campResposta} 
					onChange={(value)=> this.setState({campResposta:value.target.value})}
					required="required"
					placeholder="Olá, tudo bem?&#13;&#10;Como posso te ajudar?&#13;&#10;Abraços, a gente se vê!"
				></textarea>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Salvar</button>
      {'   '}
      <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Perguntas</button>
    </div>
  );
}

handleClick () {
  this.props.history.push("/");
}

sendSave(){

  if (this.state.campPergunta==="") {
    alert("O campo pergunta não pode estar vazio.")
  }
  else if (this.state.campResposta==="") {
     alert("O campo resposta não pode estar vazio.")
  }
  else {

    const datapost = {
      pergunta : this.state.campPergunta,
      resposta : this.state.campResposta
    }

    axios.post(baseUrl + "/perguntas/create",datapost)
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