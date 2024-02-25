import React, { Component } from 'react';
import './App.css';
import StudentPage from './components/studentComponents/StudentPage/StudentPage.jsx';
import InstructorPage from './components/instructorComponents/InstructorPage/InstructorPage.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import { getFirestore, collection, getDocs, query } from "firebase/firestore";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: null,
            uid: null,
            email: null,
            isInstructor: null,
            firestoredb: null
        };
    }

    processUserFirestore = () => {
        const usersRef = collection(this.state.firestoredb, "Users");

    }

    loginSuccessful = (displayName, uid, isInstructor, database, email) => {
        this.setState(
            { 
                displayName: displayName, 
                uid: uid,
                email: email,
                isInstructor: isInstructor,
                firestoredb: database, 
            },
            () => this.processUserFirestore()
        );

    }

    render() {
        return (!this.state.uid ? <LoginPage loginSuccessful={this.loginSuccessful}></LoginPage> : this.state.isInstructor ? <InstructorPage {...this.state} /> : <StudentPage {...this.state} />
        );
    }
}

export default App;
