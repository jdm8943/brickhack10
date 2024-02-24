import React, { Component } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Navbar } from 'react-bootstrap';
import { StudentPage } from './StudentPage/StudentPage.jsx'; from;
import {auth, app, db} from './firebase/firebase.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render = () => {
    return (
      <div>test
        <StudentPage></StudentPage>
      </div>
    );
  }
}

export default App;
