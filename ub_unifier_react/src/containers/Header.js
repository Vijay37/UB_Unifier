import React, {Component} from "react";
import { Button, Navbar } from 'react-bootstrap'
export default class Header extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">React-Bootstrap</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
</Navbar>

    );
  }
}
