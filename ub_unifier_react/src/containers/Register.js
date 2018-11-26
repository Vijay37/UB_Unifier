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
    this.is_valid_email=this.is_valid_email.bind(this);
    this.is_buffalo_email=this.is_buffalo_email.bind(this);
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
      var home_path=`${process.env.PUBLIC_URL}/`;
      this.props.history.push(home_path);
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
        that.props.history.push("/Login?msg=register");
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
  is_valid_email(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email_signup).toLowerCase());
  }
  is_buffalo_email(){
    if(this.state.email_signup.indexOf("@buffalo.edu")<0)
     return false;
    else
     return true;
  }
  registerUser(){
    // validate register form
    if(this.state.fname_signup.trim()==="" || this.state.lname_signup.trim()==="" || this.state.email_signup.trim()==="" || this.state.password_signup.trim()===""){
      this.setState({
        signup_msg:"Fields cannot be blank",
      })
    }
    else if(this.state.password_signup != this.state.confirmpassword_signup){
      this.setState({
        signup_msg:"Password and confirm password do not match",
      })
    }
    else if(!this.is_valid_email()){
      this.setState({
        signup_msg:"Invalid email id",
      })
    }
    else if(!this.is_buffalo_email()){
      this.setState({
        signup_msg:"Email ID should be of @buffalo.edu",
      })
    }
    else
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
