import React, {Component} from "react";
import {Button, FormGroup,FormControl,ControlLabel} from "react-bootstrap";
import '../App.css';
import "./Login.css";
const API="http://localhost:8888/Unifier_API/API.php";
export default class Login extends Component{
  constructor(props){
    super(props);
    this.login_php=this.login_php.bind(this);
    this.validateForm=this.validateForm.bind(this);
    this.state={
      email:"",
      password:""
    }
  }
  login_php(){
    var formData = new FormData();
    formData.append('KEY',"LOGIN");
    formData.append('EMAIL',this.state.email);
    formData.append('PASSWORD',this.state.password);
    return fetch(API,{
      method:"POST",
      mode: "cors",
      cache:"no-cache",
      headers:{
      },
      body:formData,
    }
  ).then(response=>response.json())
  .then(function(data){
    console.log("Data:",data);
  })
  .catch(function(error){
    console.log("Request failed",error);
  })};
  validateForm(){
    console.log("Email :"+this.state.email);
    console.log("Password :"+this.state.password);
    if(this.state.email.length<=0 || this.state.password.length<=0)
     return;
    this.login_php();

  }
  handleChange=event=>{
    this.setState({
      [event.target.id]:event.target.value
    })
  }
  render(){
    return(
      <div className="{Login,App}">
        <header className="App-header">UB UNIFIER</header>
        <div>
          Email: <input type='email' id="email" value={this.state.email} onChange={(event)=>this.handleChange(event)}/>
        Password: <input type='password' id="password" value={this.state.password} onChange={(event)=>this.handleChange(event)}/>
      <button onClick={this.validateForm}> Login </button>
        </div>

      </div>

    )
  }
}
