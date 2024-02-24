import React, { Component } from 'react';
import './App.css';
import StudentPage from './StudentPage/StudentPage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <LoginPage></LoginPage>
    );
  }
}

export default App;
