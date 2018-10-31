import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, FormGroup,FormControl,} from "react-bootstrap";
import Header from "./Header";
import * as constants from './Constants';
import '../App.css';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Login extends Component{
  constructor(props){
    super(props);

    this.login_php=this.login_php.bind(this);
    this.register_php=this.register_php.bind(this);
    this.validateForm=this.validateForm.bind(this);
    this.registerUser=this.registerUser.bind(this);
    this.post_data=this.post_data.bind(this);
    this.state={
      email:"",
      password:"",
      email_signup:"",
      fname_signup:"",
      lname_signup:"",
      password_signup:"",
      confirmpassword_signup:"",
      signup_msg:"",
      signin_msg:"",
    }
  }
  login_php(){
    var formData = new FormData();
    formData.append('KEY',"LOGIN");
    formData.append('EMAIL',this.state.email);
    formData.append('PASSWORD',this.state.password);
    this.post_data(formData,"LOGIN");
  };
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
    console.log("Data",data);
    if(caller==="REGISTER"){
      if(data.STATUS==="SUCCESS"){
        that.setState({
         signup_msg:data.message,

       });
      }
    }
    else if(caller==="LOGIN"){
      if(data.STATUS==="FAILURE"){
        that.setState({
         signin_msg:data.message,

       });
      }
      else if(data.STATUS==="SUCCESS"){
        sessionStorage.setItem('loggedin', 'true');
        sessionStorage.setItem('user', that.state.email);

        that.props.history.push('/');
      }
    }
  })
  .catch(function(error){
    console.log("Request failed",error);
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
  validateForm(){
    console.log("Email :"+this.state.email);
    console.log("Password :"+this.state.password);
    if(this.state.email.length<=0 || this.state.password.length<=0)
     return;
    this.login_php();

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
      signin_msg:"",// Resetting Signin Message
    })
  }
  render(){
    return(
      <div className="">
        <Header/>
      <div className="login-grid">
        <div className="row">
          <div className="col-md-4 login-containers">
            <form>
              <FormGroup className="form-group">
                <div className="row header-font">
                  LOGIN
                </div>
            <div className="row" >
              <FormControl bsClass="inputCSS" placeholder="Email" type='email' id="email" value={this.state.email} onChange={(event)=>this.handleChange(event)}/>
            </div>
            <div className="row" >
              <FormControl bsClass="inputCSS" type='password' id="password" placeholder="Password" value={this.state.password} onChange={(event)=>this.handleChange(event)}/>
            </div>
            <div className="row">
              <Button className="primary-button btn-primary" onClick={this.validateForm}> LOGIN </Button>
            </div>
            <div className="row linkCSS">
            <Link to="/ForgotPassword">Forgot password?</Link>
           </div>
            <div className="row error_msg_css" id="signup_msg">
              {this.state.signin_msg}
            </div>
          </FormGroup>
          </form>
          </div>
          <div className="col-md-4 ">
          </div>
        <div className="col-md-4">
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
