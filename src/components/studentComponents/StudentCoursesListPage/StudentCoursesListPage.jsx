import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import StudentCoursePage from './StudentCoursePage';
import { getFirestore, collection, getDocs, query, doc, getDoc, where, setDoc } from "firebase/firestore";
class StudentCoursesListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classCodes: null,
            courseRefs: null,
        };
        
        getDoc(this.props.userRef)
            .then((userSnap) => {
                this.setState({
                    classCodes: userSnap.classCodes,
                }, () => {
                    // callback because must wait for classCodes to be populated
                    this.populateCourseReferences();
                })
        });
    }

    populateCourseReferences = () => {
        getDoc(this.props.userRef)
            .then((userSnap) => {
                this.setState({
                    classCodes: userSnap.classCodes,
                })
        });

        // Loop through IDs and fetch documents
        const courseIdArray = this.state.courseCodes;
        const courseDocProms = courseIdArray.map((id) => {
            const courseRef = doc(id);
            return courseRef.get().then((docSnap) => {
                if (docSnap.exists) {
                    return { ...docSnap.data(), id: docSnap.id }; // Add ID to document object
                } else {
                    // Handle non-existent documents
                    return null;
                }
            });
        });
    }

    render() {
        return <div>StudentCoursesListPage</div>
    }
}

export default StudentCoursesListPage;