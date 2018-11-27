import React,{Component} from 'react';
import Header from './Header'
import {Button,FormControl} from "react-bootstrap";
import "./Login.css";
import "./ForgotPassword.css";
import * as constants from './Constants';
export default class ForgotPassword extends Component{
  constructor(props){
    super(props);
    this.validateForm=this.validateForm.bind(this);
    this.post_data=this.post_data.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.state={
      email:"",
      message:"",
    }
  }
  validateForm(){
    if(this.state.mail!==""){
    var formData = new FormData();
    formData.append('KEY',"FORGOTPASSWORD");
    formData.append('EMAIL',this.state.email);
    this.post_data(formData,"ForgotPassword");
    }
  }
  handleChange=event=>{

    this.setState({
      [event.target.id]:event.target.value,
      message:"",
    })
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
    if(data.STATUS==="SUCCESS"){
        that.setState({
          message:"Reset Link has been mailed to the registered mail id.",
        });
      }
      else{
        that.setState({
          message:"Server error occurred.",
        });
      }
  })
  .catch(function(error){
    console.log("Request failed",error);
  })
  }
  render(){
    return(
      <div>
          <Header/>
        <div className="ForgotPasswordDivCSS">
        <div className="form-group">
          <div className="row header-font">
            Forgot Password
          </div>
          <div className="row" >
            <FormControl bsClass="inputCSS" placeholder="Email" type='email' id="email" value={this.state.email} onChange={(event)=>this.handleChange(event)}/>
          </div>
          <div className="row">
            <Button className="primary-button btn-primary" onClick={this.validateForm}> SUBMIT </Button>
          </div>
          <div className="row props_msg_css" id="message_div">
            {this.state.message}
          </div>
        </div>
      </div>
      </div>
    )
  }

}
