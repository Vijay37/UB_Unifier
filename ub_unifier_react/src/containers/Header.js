import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../App.css';
import './Header.css';
export default class Header extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <header className="App-header">
        <div className="headerimgDiv">
          <Link to="/">
        <img className="ubHeaderCSS" src={require('../Files/ub_logo.jpg')}/>
    </Link>
      </div>
      <div className="headerTitleCSS">UB UNIFIER</div>
    { this.props.enableLogout?
      <div className="iconCSS">
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
