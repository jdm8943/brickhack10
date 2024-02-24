import React, { Component } from 'react';
import './App.css';
import StudentPage from './StudentPage/StudentPage.jsx';
import SessionPage from './LearningSessionPage/SessionPage.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <SessionPage></SessionPage>
    );
  }
}

export default App;
