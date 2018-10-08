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
      </div>
    );
  }
}

export default App;
