import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// import React from 'react';  
// import ReactDom from 'react-dom';  
// import { Router, Route} from 'react-router';
// import { BrowserRouter} from 'react-router-dom'; 
// import App from './App'; 
// import routes from './routes';

// // ReactDom.render(<Router history={browserHistory} routes={routes} />, document.querySelector('#app'));  
// ReactDOM.render(<BrowserRouter>
//   <div>
//     <Route path='/' component={App}/>
//   </div>
// </BrowserRouter>);
