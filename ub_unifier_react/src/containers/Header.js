import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../App.css';
import './Header.css';
export default class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      email:""
    }
  }
  componentDidMount(){
    let emailId=sessionStorage.getItem('user');
    if(emailId!=""){
      emailId = emailId.replace("@buffalo.edu","");
      this.setState({
        email:emailId,
      })
    }
  }
  render(){
    return(
      <header className="App-header">
      <div className="headerTitleCSS">
        <div className="headerimgDiv">
          <Link to="/">
        <img className="ubHeaderCSS" src={require('../Files/ub_logo.jpg')}/>
    </Link>
      </div>
        UB UNIFIER</div>
    { this.props.enableLogout?
      <div className="iconCSS">
        <FontAwesomeIcon
              icon="user"
              className="userBtnCSS"
              onClick={this.props.handleOnClick}
            />
          <div className="userNameCSS">  {this.state.email}</div>
      <FontAwesomeIcon
            icon="sign-out-alt"
            className="userBtnCSS"
            onClick={this.props.handleOnClick}
          />
      </div> : null
  }
      </header>
    );
  }
}
