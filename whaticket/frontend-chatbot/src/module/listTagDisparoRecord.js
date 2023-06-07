import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
const baseWTUrl = process.env.REACT_APP_URL;

class ListTagUser extends React.Component {

  constructor(props){
    super(props);
      this.state = {
      tags: [],
      listWhatsApp: [],
      campToken: "",
      campMin: "",
      campMax: ""
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
            tagSelected.push(user.usuario + ' ')
          }
        }
        this.setState({ numberUser: tagSelected });
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
        this.setState({ conexaoInicial: data[0].id });
      }
      else{
          alert("Error web service");
      }
    })
    .catch(error => {
      alert("Error server " + error)
    });
  }

  async sendMessage(numeros, midia, token, id, min, max) {
    if (midia === undefined) {
      alert("O campo url áudio não pode estar vazio.")
    }
    else if (numeros === undefined) {
      alert("O campo tag não pode estar vazio.")
    }
    else if (this.state.campToken === "") {
      alert("O campo token não pode estar vazio.")
    }
    else if (this.state.campMin === "") {
      alert("O campo mínimo não pode estar vazio.")
    }
    else if (this.state.campMax === "") {
      alert("O campo máximo não pode estar vazio.")
    }
    else {
      alert('Disparo iniciado! Clique ok e aguarde o término do envio')
      const timer = ms => new Promise(res => setTimeout(res, ms))
      function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      for (const numero of numeros){
        const rndInt = randomIntFromInterval(min, max)
        await timer(rndInt * 1000)
        try {
          axios.post(baseWTUrl + '/sendMediaZDGRec', {
            number: numero.replace(/\D/g,'') + '@c.us',
            url: midia,
            ticketwhatsappId: parseInt(id),
            token: token
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        } catch(e){
          console.log(e)
        }
        try {
          axios.post(baseWTUrl + '/sendMediaZDGRec', {
            number: numero.replace(/\D/g,'') + '@g.us',
            url: midia,
            ticketwhatsappId: parseInt(id),
            token: token
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        } catch(e){
          console.log(e)
        }
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
      const { tagUser, conexao } = this.state;
      return <div className="drop-down">
        <div>
          <div className="form-row justify-content-center">
            <div className="form-group col-md-12">
                <label htmlFor="url">Url Áudio OGG </label>
                <input 
                className="form-control"
                name="campUrl" 
                value={this.state.campUrl} 
                onChange={(value)=> this.setState({campUrl:value.target.value})}
                required="required"
                placeholder="https://comunidadezdg.com.br/audio.ogg"
              ></input>
            </div>
            <div className="form-group col-md-6">
            <p>Conexão ID: {(this.state.conexao === undefined) ? this.state.conexaoInicial : this.state.conexao}</p>
            <select 
                className="form-control"
                onChange={(value)=> this.setState({conexao:value.target.value})}
                value={conexao} 
              >{
                this.state.listWhatsApp.map((wpp) => {
                    return <option value={wpp.idWhaticket} key={wpp.nome}>{wpp.nome}</option>
                })
            }</select>
            </div>
            <div className="form-group col-md-6">
            <p>Tag: {this.state.tagUser} - Usuários: {this.state.numberUser}</p>
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
            <div className="form-group col-md-12">
              <label htmlFor="token">Token </label>
              <input 
              className="form-control"
              name="campToken" 
              value={this.state.campToken} 
              onChange={(value)=> this.setState({campToken:value.target.value})}
              required="required"
              placeholder="xxxxxxxxxxx-xxxxxxxxxxx-xxxxxxxxx-xxxxxxxxxx"
            ></input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="min">Mínimo </label>
              <input 
              className="form-control"
              name="campMin" 
              value={this.state.campMin} 
              onChange={(value)=> this.setState({campMin:value.target.value})}
              required="required"
              placeholder="1 segundo"
            ></input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="max">Máximo </label>
              <input 
              className="form-control"
              name="campMax" 
              value={this.state.campMax} 
              onChange={(value)=> this.setState({campMax:value.target.value})}
              required="required"
              placeholder="10 segundos"
            ></input>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={()=>this.sendMessage(this.state.numberUser, this.state.campUrl, this.state.campToken, (this.state.conexao === undefined) ? this.state.conexaoInicial : this.state.conexao, this.state.campMin, this.state.campMax)}>Enviar</button>
          {'   '}
          <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Tags</button>
        </div>
      </div>;
  }
}

export default ListTagUser;