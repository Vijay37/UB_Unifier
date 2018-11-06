import React,{Component} from 'react';
import Header from './Header';
import {Button, FormGroup,FormControl,} from "react-bootstrap";
import * as constants from './Constants';
import '../App.css';
import "./Login.css";
export default class Register extends Component{
  constructor(props){
    super(props);
    this.register_php=this.register_php.bind(this);
    this.registerUser=this.registerUser.bind(this);
    this.post_data=this.post_data.bind(this);
    this.onloadfunction=this.onloadfunction.bind(this);
    this.state={
      email_signup:"",
      fname_signup:"",
      lname_signup:"",
      password_signup:"",
      confirmpassword_signup:"",
      signup_msg:"",
    }
  }
  componentDidMount() {
    this.onloadfunction();
  }
  onloadfunction(){
    if(sessionStorage.getItem('loggedin')==='true'){
      this.props.history.push("/");
    }

  }
  post_data(formData,caller){
    const that = this;
    return fetch(constants.API,{
      method:"POST",
      mode: "cors",
      cache:"no-cache",
      headers:{
      },
      body:formData,
    }
  ).then(response=>response.json())
  .then(function(data){
      if(data.SIGNUP==="SUCCESS" && data.STATUS==="SUCCESS"){
        that.props.history.push("/Login");
      }
      else if(data.STATUS==="SUCCESS"){
        that.setState({
         signup_msg:data.message,

       });
      }
  })
  .catch(function(error){
    console.log("Request failed",error);
  })
  }
  registerUser(){
    // validate register form
    console.log("Registering new user");
    this.register_php();
  }
  handleChange=event=>{

    this.setState({
      [event.target.id]:event.target.value,
      signup_msg:"", // Resetting Signup Message
    })
  }
  register_php(){
    var formData = new FormData();
    formData.append("KEY","REGISTER");
    formData.append("F_NAME",this.state.fname_signup);
    formData.append("L_NAME",this.state.lname_signup);
    formData.append("EMAIL",this.state.email_signup);
    formData.append("PASSWORD",this.state.password_signup);
    this.post_data(formData,"REGISTER");
  }
  render(){
    return(
      <div>
        <Header enableLogout={false}/>
        <div className="login-grid">
          <div className="row">
          <div className="col-md-12">
            <form>
              <FormGroup bsClass="form-group">
                <div className="row header-font">
                  SIGN UP
                </div>
              <div className="row">
                <FormControl bsClass="inputCSS" type='email' id="email_signup" value={this.state.email_signup} placeholder="Email" onChange={(event)=>this.handleChange(event)}/>
              </div>
              <div className="row" >
                <FormControl bsClass="inputCSS" type='text' id="fname_signup" value={this.state.fname_signup} placeholder="First Name" onChange={(event)=>this.handleChange(event)}/>
              </div>
              <div className="row" >
                <FormControl bsClass="inputCSS" type='text' id="lname_signup" value={this.state.lname_signup} placeholder="Last Name" onChange={(event)=>this.handleChange(event)}/>
              </div>
              <div className="row" >
                <FormControl bsClass="inputCSS" type='password' id="password_signup" value={this.state.password_signup} placeholder="Password" onChange={(event)=>this.handleChange(event)}/>
              </div>
              <div className="row" >
                <FormControl bsClass="inputCSS" type='password' id="confirmpassword_signup" value={this.state.confirmpassword_signup}  placeholder="Confirm Password"onChange={(event)=>this.handleChange(event)}/>
              </div>
              <div className="row">
                <Button className="primary-button btn-primary" onClick={this.registerUser}> SIGN UP </Button>
              </div>
              <div className="row error_msg_css" id="signup_msg">
                {this.state.signup_msg}
              </div>
            </FormGroup>
            </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
