import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

class EditComponent extends React.Component{

 constructor(props){
   super(props);
   this.state = {
     campTag: "",
     campColor: "#ffffff"
   }
 }

 render(){
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Tag</label>
          <input type="text" className="form-control"  placeholder="Nome da Tag" value={this.state.campTag} onChange={(value)=> this.setState({campTag:value.target.value})}/>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Cor</label>
          <input type="color" className="form-control"  placeholder="5535988754197" value={this.state.campColor} onChange={(value)=> this.setState({campColor:value.target.value})}/>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Salvar</button>
      {'   '}
        <button type="submit" className="btn btn-primary" onClick={()=>this.handleClick()}>Listar Tags</button>
    </div>
  );
}

handleClick () {
  this.props.history.push("/listTag");
}

sendSave(){

  if (this.state.campTag==="") {
    alert("O campo tag não pode estar vazio.")
  }
  else if (this.state.campColor==="") {
     alert("O campo color não pode estar vazio.")
  }
  else {

    const datapost = {
      tag : this.state.campTag,
      color : this.state.campColor
    }

    axios.get(baseUrl + "/tag/list")
    .then(res => {
      if(res.data.success){
        const datas = res.data.data;
        let obj = datas.find(o => o.tag === this.state.campTag);
        if(obj !== undefined) {
          //console.log(obj);
          alert('Uma tag com esse nome já existe.')
        }
        if(obj === undefined) {
          //console.log(obj);
          axios.post(baseUrl + "/tag/create",datapost)
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

        // for (const data of datas) {
        //   const dataTag = data.tag
        //   console.log(dataTag)
        //   if(dataTag === this.state.campTag){
        //     alert('Uma tag com esse nome já existe.')
        //   }
        //   if(dataTag !== this.state.campTag){
        //     axios.post(baseUrl + "/tag/create",datapost)
        //     .then(response=>{
        //       if (response.data.success===true) {
        //         alert(response.data.message)
        //       }
        //       else {
        //         alert(response.data.message)
        //       }
        //     }).catch(error=>{
        //       alert("Error 34 "+ error)
        //     })
        //   }
        // }
        // if (JSON.stringify(data).includes(this.state.campTag) === true){
        //   alert('Uma tag com esse nome já existe.')
        // }
        // else if (JSON.stringify(data).includes(this.state.campTag) === false){
        //   axios.post(baseUrl + "/tag/create",datapost)
        //   .then(response=>{
        //     if (response.data.success===true) {
        //       alert(response.data.message)
        //     }
        //     else {
        //       alert(response.data.message)
        //     }
        //   }).catch(error=>{
        //     alert("Error 34 "+ error)
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

}


export default EditComponent;