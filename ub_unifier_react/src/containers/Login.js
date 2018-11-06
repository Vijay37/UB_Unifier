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
    this.validateForm=this.validateForm.bind(this);
    this.post_data=this.post_data.bind(this);
    this.onloadfunction=this.onloadfunction.bind(this);

    this.state={
      email:"",
      password:"",
      signin_msg:"",
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
    if(caller==="LOGIN"){
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
  validateForm(){
    console.log("Email :"+this.state.email);
    console.log("Password :"+this.state.password);
    if(this.state.email.length<=0 || this.state.password.length<=0)
     return;
    this.login_php();

  }

  handleChange=event=>{

    this.setState({
      [event.target.id]:event.target.value,
      signin_msg:"",// Resetting Signin Message
    })
  }
  render(){
    return(
      <div className="">
        <Header enableLogout={false}/>
      <div className="login-grid">
        <div className="row">
          <div className="col-md-12 login-containers">
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
            <div className="col-md-8">
            <Link to="/ForgotPassword">Forgot password?</Link></div>
          <div className="col-md-4"><Link to="/Register"> SignUp</Link></div>
           </div>

            <div className="row error_msg_css" id="signup_msg">
              {this.state.signin_msg}
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
