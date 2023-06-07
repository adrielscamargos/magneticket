import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';

import { matchPath } from 'react-router'

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class EditComponent extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      dataTag:{},
      campTag: "",
      campColor:"#ffffff"
    }
  }

  componentDidMount(){

    const match = matchPath(this.props.history.location.pathname, {
      path: '/editTag/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    //console.log(userId);
    const url = baseUrl+"/tag/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataTag:data,
          campTag:data.tag,
          campColor:data.color
        })
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }

  render(){
    return (
      <div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Tag</label>
            <input type="text" className="form-control"  placeholder="Nome da Tag"
              value={this.state.campTag} onChange={(value)=> this.setState({campTag:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Cor</label>
            <input type="color" className="form-control"  placeholder="553588754197"
              value={this.state.campColor} onChange={(value)=> this.setState({campColor:value.target.value})}/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
        {'   '}
        <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Tags</button>
      </div>
    );
  }

  handleClick () {
    this.props.history.push("/listTag");
  }


  sendUpdate(){
   
    const match = matchPath(this.props.history.location.pathname, {
      path: '/editTag/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    
    // parametros de datos post
    const datapost = {
      tag : this.state.campTag,
      color : this.state.campColor
    }

    const datapostColor = {
      color : this.state.campColor
    }

    axios.get(baseUrl + "/tag/list")
    .then(res => {
      if(res.data.success){
        const datas = res.data.data;
        let obj = datas.find(o => o.tag === this.state.campTag);
        if(obj !== undefined) {
          if(obj.tag === this.state.campTag && obj.color !== this.state.campColor){
            axios.post(baseUrl + "/tag/update/"+userId,datapostColor)
            .then(response=>{
              if (response.data.success===true) {
                alert(response.data.message)
              }
              else {
                alert("Error")
              }
            }).catch(error=>{
              alert("Error 34 "+error)
            })
          }
          if(obj.tag === this.state.campTag && obj.color === this.state.campColor){
            alert('Uma tag com esse nome já existe.')
          }
          // console.log(obj);
          // console.log(obj.tag);
          // console.log(obj.color);
          // console.log(obj);
          // alert('Uma tag com esse nome já existe.')
        }
        if(obj === undefined) {
          axios.post(baseUrl + "/tag/update/"+userId,datapost)
          .then(response=>{
            if (response.data.success===true) {
              alert(response.data.message)
            }
            else {
              alert("Error")
            }
          }).catch(error=>{
            alert("Error 34 "+error)
          })
        }
        // for (const data of datas) {
        //   const dataTag = data.tag
        //   console.log(dataTag)
        //   if(dataTag === this.state.campTag){
        //     alert('Atenção, uma tag com esse nome já existe. Altere o nome dessa tag.')
        //   }
        //   if(dataTag !== this.state.campTag){
        //     axios.post(baseUrl + "/tag/update/"+userId,datapost)
        //     .then(response=>{
        //       if (response.data.success===true) {
        //         alert(response.data.message)
        //       }
        //       else {
        //         alert("Error")
        //       }
        //     }).catch(error=>{
        //       alert("Error 34 "+error)
        //     })
        //   }
        // }

        // if (JSON.stringify(datas).includes(this.state.campTag) === true){
        //   alert('Uma tag com esse nome já existe.')
        // }
        // else if (JSON.stringify(datas).includes(this.state.campTag) === false){
        //   axios.post(baseUrl + "/tag/update/"+userId,datapost)
        //   .then(response=>{
        //     if (response.data.success===true) {
        //       alert(response.data.message)
        //     }
        //     else {
        //       alert("Error")
        //     }
        //   }).catch(error=>{
        //     alert("Error 34 "+error)
        //   })

        // }
      }
      else{
          alert("Error web service");
      }
    })
    .catch(error => {
      alert("Error server " + error)
    });

   }

}


export default EditComponent;