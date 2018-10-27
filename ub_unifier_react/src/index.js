import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import Home from './containers/Home';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
ReactDOM.render(
 (
   <Router>
     <App>
       <Switch>
         <Route exact path="/" component={Home}/>
         <Route path="/Login" component={Login}/>
         <Route component={NotFound}/>
       </Switch>
     </App>
   </Router>
 )
  , document.getElementById('root'));
registerServiceWorker();
