import React, { Component } from 'react';
import './App.css';
import StudentPage from './components/studentComponents/StudentPage/StudentPage.jsx';
import InstructorPage from './components/instructorComponents/InstructorPage/InstructorPage.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import { getFirestore, collection, getDocs, query, doc, getDoc, where, setDoc } from "firebase/firestore";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: null,
            uid: null,
            email: null,
            isInstructor: null,
            firestoredb: null,
            userInfo: null,
        };
    }

    processUserFirestore = () => {
        const usersRef = collection(this.state.firestoredb, "Users");
        const dref = doc(usersRef, this.state.uid)
        getDoc(dref)
            .then((docSnapshot) => {
                // if no user, prompt to create a new user
                // if user is found, continue onto default landing page
                if (!docSnapshot.exists()) {
                    console.log("no user found. create new");
                    const newUser = {
                        displayName: this.state.displayName,
                        email: this.state.email,
                        uid: this.state.uid,
                        elo: 0,
                        type: (this.state.isInstructor ? "instructor" : "student"),
                        classCodes: [],
                        questionTags: [],
                    }
                    setDoc(dref, newUser)
                        .then(() => {
                            console.log("User written with ID:", dref.id);
                        })
                        .catch((error) => {
                            console.error("Error adding document:", error);
                        });
                } else {
                    const uData = docSnapshot.data();
                    this.setState({
                        displayName: uData.displayName,
                    })
                    console.log(uData)
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
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
