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
          listPerguntas:[]
      }
  }  

  componentDidMount(){
    this.loadPerguntas();
  }

  loadPerguntas(){
    axios.get(baseUrl + "/perguntas/list")
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        this.setState({ listPerguntas:data });
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
      <Link className="btn btn-info " to="/form">Adicionar Pergunta</Link>
      {'   '}
      <Link className="btn btn-info " to="/csvPergunta">Importar Perguntas (.csv)</Link>
      <br></br>
      <hr></hr>
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pergunta</th>
            <th scope="col">Resposta</th>
            <th scope="col">Editar</th>
            <th scope="col">Deletar</th>
          </tr>
        </thead>
        <tbody>
        {this.loadFillData()}
        </tbody>
      </table>
      </div>
    );
  }

  loadFillData(){
    return this.state.listPerguntas.map((data)=>{
        return(
          <tr key={"datapergunta" + data.id}>
            <th >{data.id}</th>
            <td>{data.pergunta}</td>
            <td>{data.resposta}</td>
            <td>
              <Link className="btn btn-outline-info" to={"/edit/"+data.id}>Editar</Link>
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
    axios.post(baseUrl + "/perguntas/delete",{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado!',
          'Sua pergunta foi removida.',
          'success'
        )
        this.loadPerguntas();
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;