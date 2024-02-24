import React, { Component } from 'react';
import './App.css';
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
