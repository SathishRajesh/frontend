import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import RoutingData from "./component/route"
// import Login from './component/loginform';
// import App from './component/node';
// import Signup from './component/signup'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <RoutingData/>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
