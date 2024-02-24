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
      isInstructor: null,
    };
  }

  loginSuccessful = (displayName, uid, isInstructor) => {
    this.setState({displayName: displayName, uid: uid, isInstructor: isInstructor})
  }

  render(){
    return ( !this.state.uid ? <LoginPage loginSuccessful={this.loginSuccessful}></LoginPage> : this.state.isInstructor ? <InstructorPage/> : <StudentPage/>
    );
  }
}

export default App;
