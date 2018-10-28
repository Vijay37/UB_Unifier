import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import '../App.css';
import './Header.css';
import Home from './Home';
export default class Header extends Component{
  constructor(props){
    super(props);
    this.navigateToHome=this.navigateToHome.bind(this);
  }
  navigateToHome(){

  }
  render(){
    return(
      <header className="App-header">
        <div className="headerimgDiv" onClick={this.navigateToHome()}>
          <Link to="/">
        <img className="ubHeaderCSS" src={require('../Files/ub_logo.jpg')}/>
    </Link>
      </div>
      <div className="headerTitleCSS">UB UNIFIER</div>
      </header>
    );
  }
}
