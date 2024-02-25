import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App style={{backgroundColor: "var(--background)"}}/>
  </React.StrictMode>,
  document.getElementById('root')
);