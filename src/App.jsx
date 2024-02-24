import React, { Component } from 'react';
import './App.css';
import StudentPage from './StudentPage/StudentPage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      uid: null,
    };
  }

  loginSuccessful = (displayName, uid) => {
    console.log(displayName,  uid);
    this.setState({displayName: displayName, uid: uid})
  }

  render(){
    return (
      <LoginPage loginSuccessful={this.loginSuccessful}></LoginPage>
    );
  }
}

export default App;
