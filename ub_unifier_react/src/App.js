import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, IndexRoute } from 'react-router';
// import { createStackNavigator } from 'react-navigation';

class App extends Component {
  static navigationOptions = {header: null};
  render() {
    return (
      <div className="App">
          <h1 className="App-title">Welcome to React</h1>
        <p className="App-intro">
          UB Unifier
        </p>

import Login from "./containers/Login";
const API="http://localhost:8888/Unifier_API/API.php";
class App extends Component {
  constructor(props){
    super(props);
    this.load_php=this.load_php.bind(this);
    this.state={
      key:""
    }
  }
  load_php(){
    var formData = new FormData();
    formData.append('KEY',"test");
    return fetch(API,{
      method:"POST",
      mode: "cors",
      cache:"no-cache",
      headers:{
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json'
      },
      body:formData,
    }
  )
  .then(response=>response.json())
  .then(function(data){
    console.log("Data:",data);
  })
  .catch(function(error){
    console.log("Request failed",error);
  })
  ;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">UB Unifier</h1>
        </header>
        <Login />
        <button onClick={this.load_php}>
          TEST
        </button>

      </div>
    );
  }
}

export default App;
