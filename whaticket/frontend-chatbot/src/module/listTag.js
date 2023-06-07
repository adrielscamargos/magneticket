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
          listTag:[]
      }
  }  

  componentDidMount(){
    this.loadTag();
  }

  loadTag(){
    axios.get(baseUrl + "/tag/list")
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        this.setState({ listTag:data });
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
      <Link className="btn btn-info " to="/formTag">Adicionar Tag</Link>
      {'   '}
      <Link className="btn btn-info " to="/listTagDisparo">Envio Texto Tag</Link>
      {'   '}
      <Link className="btn btn-info " to="/listTagDisparoMidia">Envio Mídia Tag</Link>
      {'   '}
      <Link className="btn btn-info " to="/listTagDisparoRecord">Envio Áudio Gravado Tag</Link>
      {'   '}
      <Link className="btn btn-info " to="/listTagAgendamento">Agendamento Tag</Link>
      <br></br>
      <hr></hr>
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tag</th>
            <th scope="col">Cor</th>
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
    return this.state.listTag.map((data)=>{
        return(
          <tr key={"datatag" + data.id}>
            <th>{data.id}</th>
            <td>{data.tag}</td>
            <td><button onClick={()=>this.onTag(data.tag, data.color)} style={{ backgroundColor: data.color, border: 0, borderRadius:5, padding:5 }}>{data.color}</button></td>
            <td>
              <Link className="btn btn-outline-info" to={"/editTag/"+data.id}>Editar</Link>
            </td>
            <td>
              <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}>Deletar </button>
            </td>
          </tr>
        )
      });
  }

  onTag(tag, cor){
    alert('Cor ' + cor + ' definida para tag ' + tag + '.')
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

  // listUserTags(tagZDG){
  //   axios.get(baseUrl + "/taguser/list")
  //   .then(res => {
  //     if(res.data.success){
  //       const datas = res.data.data;
  //       for(const data of datas){
  //         const tagUser = data.tag
  //         console.log(tagUser.replace(tagZDG,''))
  //         if(tagUser.includes(',')){
  //           const datapost = {
  //             tag: tagUser.replace(tagZDG + ',','')
  //           }
  //           axios.post(baseUrl + "/taguser/update/"+data.id,datapost)
  //           .then(response=>{
  //             if (response.data.success===true) {
  //               alert(response.data.message)
  //             }
  //             else {
  //               alert("Error")
  //             }
  //           }).catch(error=>{
  //             alert("Error 34 "+error)
  //           })
  //         }
  //         if(!tagUser.includes(',')){
  //           const datapost = {
  //             tag: tagUser.replace(tagZDG,'')
  //           }
  //           axios.post(baseUrl + "/taguser/update/"+data.id,datapost)
  //           .then(response=>{
  //             if (response.data.success===true) {
  //               alert(response.data.message)
  //             }
  //             else {
  //               alert("Error")
  //             }
  //           }).catch(error=>{
  //             alert("Error 34 "+error)
  //           })
  //         }
  //       }
  //     }
  //     else{
  //         alert("Error web service");
  //     }
  //   })
  //   .catch(error => {
  //     alert("Error server " + error)
  //   });
  // }

  getTag(userId){
    const url = baseUrl+"/tag/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        const tagZDG = data.tag
        axios.get(baseUrl + "/taguser/list")
        .then(res => {
          if(res.data.success){
            const datas = res.data.data;
            for(const data of datas){
              const tagUser = data.tag
              console.log(tagUser.replace(tagZDG,''))
              if(tagUser.includes(',')){
                const datapost = {
                  tag: tagUser.replace(tagZDG + ',','')
                }
                axios.post(baseUrl + "/taguser/update/"+data.id,datapost)
                .then(response=>{
                  if (response.data.success===true) {
                    console.log(response.data.message)
                  }
                  else {
                    alert("Error")
                  }
                }).catch(error=>{
                  alert("Error 34 "+error)
                })
              }
              if(!tagUser.includes(',')){
                const datapost = {
                  tag: tagUser.replace(tagZDG,'')
                }
                axios.post(baseUrl + "/taguser/update/"+data.id,datapost)
                .then(response=>{
                  if (response.data.success===true) {
                    console.log(response.data.message)
                  }
                  else {
                    alert("Error")
                  }
                }).catch(error=>{
                  alert("Error 34 "+error)
                })
              }
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
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }

  sendDelete(userId)
  {
    // network
    this.getTag(userId);
    axios.post(baseUrl + "/tag/delete",{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado!',
          'Sua pergunta foi removida.',
          'success'
        )
        this.loadTag();
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;