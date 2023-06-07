import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class ListTagUser extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tags: [],
      listWhatsApp: [],
      campMensagem: "",
      campDestinatario: "",
      campDataEnvio: "",
      campHorarioEnvio: ""
    }
  }  

  componentDidMount() {
    this.loadTagList();
    this.loadWhatsApp();
  }

  loadTag(tagChoose){
    axios.get(baseUrl + "/taguser/list")
    .then(res => {
      if(res.data.success){
        const users = res.data.data;
        let tagSelected = []
        for (const user of users) {
          if(user.tag.includes(tagChoose) ){
            //console.log(user)
            tagSelected.push(user.usuario + " ")
          }
        }
        this.setState({ numberUser: tagSelected });
        //console.log(tagSelected)
      }
      else{
          alert("Error web service");
      }
    })
    .catch(error => {
      alert("Error server " + error)
    });
  }

  loadTagList(){
    axios.get(baseUrl + "/tag/list")
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        this.setState({ tags: data });
        //console.log(data)
      }
      else{
          alert("Error web service");
      }
    })
    .catch(error => {
      alert("Error server " + error)
    });
  }

  loadWhatsApp(){
    axios.get(baseUrl + "/whatsApp/list")
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        this.setState({ listWhatsApp: data });
        //console.log(data)
        //this.setState({ conexaoInicial: data[0].id });
      }
      else{
          alert("Error web service");
      }
    })
    .catch(error => {
      alert("Error server " + error)
    });
  }

  sendSave(numeros){
    if (this.state.campMensagem === "") {
      alert("O campo mensagem não pode estar vazio.")
    }
    else if (numeros === undefined) {
      alert("O campo tag não pode estar vazio.")
    }
    else if (this.state.campDataEnvio === "") {
      alert("O campo data não pode estar vazio.")
    }
    else if (this.state.campHorarioEnvio === "") {
      alert("O campo horário não pode estar vazio.")
    }
    else {
      alert('Agendamento iniciado! Clique ok para continuar.')
      for (const numero of numeros){
        const datapost = {
          mensagem : this.state.campMensagem,
          destinatario : numero.replace(/\D/g,''),
          dataEnvio : this.state.campDataEnvio,
          horarioEnvio : this.state.campHorarioEnvio
        }
        axios.post(baseUrl + "/agendamento/create",datapost)
        .then(response=>{
          if (response.data.success===true) {
            console.log(response.data.message);
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

  handleChange = (event) => {
    this.setState({ tagUser: event.target.value });
    this.loadTag(event.target.value);
  };

  handleClick () {
    this.props.history.push("/listTag");
  }

  render(){
      const { tagUser } = this.state;
      return <div className="drop-down">
        <div>
          <div className="form-row justify-content-center">
            <div className="form-group col-md-12">
              <label htmlFor="inputPassword4">Mensagem </label>
              {/* <input type="text" classname="form-control"  placeholder="Mensagem" value={this.state.campMensagem} onChange={(value)=> this.setState({campMensagem:value.target.value})}/> */}
              <textarea 
              className="form-control"
              name="campMensagem" 
              cols="40" 
              rows="5"
              value={this.state.campMensagem} 
              onChange={(value)=> this.setState({campMensagem:value.target.value})}
              required="required"
              placeholder="Olá, tudo bem?&#13;&#10;Como posso te ajudar?&#13;&#10;Abraços, a gente se vê!"
            ></textarea>
            </div>
            <div className="form-group col-md-4">
            <label htmlFor="inputEmail4">Tag: {this.state.tagUser}</label>
            <select
                className="form-control"
                onChange={this.handleChange} 
                value={tagUser} 
              >
                <option value="none" selected disabled hidden> 
                </option>
                {
                this.state.tags.map((tag) => {
                    return <option style={{ backgroundColor: tag.color }} value={tag.tag} key={tag.id}>{tag.tag}</option>
                })
            }</select>
            </div>
            <div className="form-group col-md-4">
            <label htmlFor="inputEmail4">Data de Envio</label>
            <input type="date" className="form-control"  placeholder="Data de Envio" value={this.state.campDataEnvio} onChange={(value)=> this.setState({campDataEnvio:value.target.value})}/>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputEmail4">Horário de Envio</label>
              <input type="time" className="form-control"  placeholder="Horario de Envio" value={this.state.campHorarioEnvio} onChange={(value)=> this.setState({campHorarioEnvio:value.target.value})}/>
            </div>
            <div className="form-group col-md-12">
              <p>Usuários: {this.state.numberUser}</p>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave(this.state.numberUser)}>Agendar</button>
          {'   '}
          <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Tags</button>
        </div>
      </div>;
  }
}

export default ListTagUser;