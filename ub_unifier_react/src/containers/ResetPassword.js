import React,{Component} from 'react';
import Header from './Header'
import {Button,FormControl} from "react-bootstrap";
import "./Login.css";
import "./ForgotPassword.css";
import queryString from 'query-string';
import * as constants from './Constants';
import {Link} from 'react-router-dom';
export default class ResetPassword extends Component{
  constructor(props){
    super(props);

    this.handleChange=this.handleChange.bind(this);
    this.resetPassword=this.resetPassword.bind(this);
    this.validateToken=this.validateToken.bind(this);
    this.post_data=this.post_data.bind(this);
    this.state={
      signup_msg:"",
      password_signup:"",
      confirmpassword_signup:"",
      msg:"",
      tokenStatus:"loading",
    }
  }
  componentDidMount(){
    const values = queryString.parse(this.props.location.search)
    const token = values.token;
    this.validateToken(token);
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
    if(caller==="TOKEN"){
      if(data.STATUS==="SUCCESS"){
        that.setState({
          tokenStatus:"true",
        })
      }
      else{
        that.setState({
          tokenStatus:"false",
        })
      }
    }
    else if(caller==="RESET"){
      if(data.STATUS==="FAILURE"){
        if(data.message==="Invalid link"){
          that.setState({
            tokenStatus:"false",
          })
        }
        else{
          that.setState({
            msg:"Server Error, please try again",
          })
        }
      }
      else if(data.STATUS==="SUCCESS"){
        var login_path=`${process.env.PUBLIC_URL}/Login?msg=reset`;
        that.props.history.push(login_path);
      }
    }
  })
  .catch(function(error){
    console.log("Request failed",error);
  })
  }
  validateToken(token){
    var formData = new FormData();
    formData.append('KEY',"VALIDATERESETTOKEN");
    formData.append('TOKEN',token);
    this.post_data(formData,"TOKEN");
  }
  resetPassword(){
    // Validate password
    if(this.state.password_signup!==this.state.confirmpassword_signup)
     return;
    const values = queryString.parse(this.props.location.search)
    const token = values.token;
    this.validateToken(token);
    var formData = new FormData();
    formData.append('KEY',"RESETPASSWORD");
    formData.append('PASSWORD',this.state.password_signup);
    formData.append('TOKEN',token);
    this.post_data(formData,"RESET");


  }
  handleChange=event=>{

    this.setState({
      [event.target.id]:event.target.value,
      msg:"", // Resetting Signup Message
    })
  }
  render(){
    if(this.state.tokenStatus==="loading"){
      return(
        <div>
        <Header/>
        </div>
      )
    }
    else if(this.state.tokenStatus==="false"){
      return(
        <div>
        <Header/>
      <div>Invalid reset link. Please generate new reset link <Link to={`${process.env.PUBLIC_URL}/ForgotPassword`}>here</Link></div>
        </div>
      )
    }
    else if(this.state.tokenStatus==="true"){
      return(
      <div>
      <Header/>
      <div className="ForgotPasswordDivCSS">
      <div className="form-group">
        <div className="row header-font">
          Reset Password
        </div>
        <div className="row" >
          <FormControl bsClass="inputCSS" type='password' id="password_signup" value={this.state.password_signup} placeholder="Password" onChange={(event)=>this.handleChange(event)}/>
        </div>
        <div className="row" >
          <FormControl bsClass="inputCSS" type='password' id="confirmpassword_signup" value={this.state.confirmpassword_signup}  placeholder="Confirm Password"onChange={(event)=>this.handleChange(event)}/>
        </div>
        <div className="row">
          <Button className="primary-button btn-primary" onClick={this.resetPassword}> RESET </Button>
        </div>
        <div className="row error_msg_css" id="msg">
          {this.state.signup_msg}
        </div>
      </div>
      </div>
      </div>
    )
    }
  }
}
