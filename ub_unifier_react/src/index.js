import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import Home from './containers/Home';
import Register from './containers/Register';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
ReactDOM.render(
 (
   <Router>
     <App>
       <Switch>
         <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home}/>
       <Route path={`${process.env.PUBLIC_URL}/Login`} component={Login}/>
     <Route path={`${process.env.PUBLIC_URL}/ForgotPassword`} component={ForgotPassword}/>
         <Route path={`${process.env.PUBLIC_URL}/Register`} component={Register}/>
       <Route exact path={`${process.env.PUBLIC_URL}/ResetPassword`} component={ResetPassword}/>
         <Route component={NotFound}/>
       </Switch>
     </App>
   </Router>
 )
  , document.getElementById('root'));
// registerServiceWorker();
