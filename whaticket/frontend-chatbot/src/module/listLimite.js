import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

import { Link } from 'react-router-dom';

//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class listComponent extends React.Component  {
  
  constructor(props){
      super(props);
      this.state = {
          listLimite:[],
          display:""
      }
  }  

  componentDidMount(){
    this.loadLimite();
    this.checkLimite();
  }

  loadLimite(){
    axios.get(baseUrl + "/limite/list")
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        this.setState({ listLimite:data });
      }
      else{
          alert("Error web service");
      }
    })
    .catch(error => {
      alert("Error server " + error)
    });
  }

  checkLimite(){
    axios.get(baseUrl + "/limite/list")
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        if(data.length > 0){
            //alert('ok')
            this.setState({display: 'none'})
        }
        else{
          alert('Adicione um limite de usuário e conexão.')
        }
      }
      else{
          alert("Error web service");
      }
    })
    .catch(error => {
      alert("Error server " + error)
    });
  }
    
  render()
  {
    return (
      <div>
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">WhatsApp</th>
              <th scope="col">Usuário</th>
              <th scope="col">Editar</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          <tbody>
            {this.loadFillData()}
          </tbody>
        </table>
        <span role="img" aria-label="warning">⚠️ Adicione apenas uma opção de limite de usuários e conexões</span>
        <br></br>
        <hr></hr>
        <Link style={{display:this.state.display}} className="btn btn-info " to="/formLimite">Adicionar Limite</Link>
        <br></br>
        <br></br>
      </div>
    );
  }

  loadFillData(){
    return this.state.listLimite.map((data)=>{
        return(
          <tr key={"datalimite" + data.id}>
            <th>{data.id}</th>
            <td>{data.whatsapp}</td>
            <td>{data.user}</td>
            <td>
              <Link className="btn btn-outline-info" to={"/editLimite/"+data.id}>Editar</Link>
            </td>
            <td>
              <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}>Deletar </button>
            </td>
          </tr>
        )
      });
  }

  onDelete(id){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'O dado não poderá ser recuperado ' + id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, eu quero deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seu arquivo está a salvo :)',
          'error'
        )
      }
    })
  }

  sendDelete(userId)
  {
    // network
    axios.post(baseUrl + "/limite/delete",{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado!',
          'Seu limite foi removido.',
          'success'
        )
        this.loadLimite();
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;