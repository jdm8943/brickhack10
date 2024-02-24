import React, { Component } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Navbar } from 'react-bootstrap';
import StudentPage from './StudentPage/StudentPage.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <StudentPage></StudentPage>
    );
  }
}

export default App;
