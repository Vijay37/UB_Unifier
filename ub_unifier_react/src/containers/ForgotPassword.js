import React,{Component} from 'react';
import Header from './Header'
import {Button, FormGroup,FormControl} from "react-bootstrap";
import "./Login.css";
import "./ForgotPassword.css";
export default class ForgotPassword extends Component{
  constructor(props){
    super(props);
    this.validateForm=this.validateForm.bind(this);
    this.validateMail=this.validateMail.bind(this);
    this.state={
      email:"",
    }
  }
  validateForm(){
    if(this.validateMail()){

    }
    else{

    }
  }
  validateMail(){
    let mailId=this.state.email;
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
        </div>
      </div>
      </div>
    )
  }

}
