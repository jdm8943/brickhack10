import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import StudentCoursePage from './StudentCoursePage';
import { getFirestore, collection, getDocs, query, doc, getDoc, where, setDoc } from "firebase/firestore";
class StudentCoursesListPage extends Component {
    constructor(props) {
        super(props);
        console.log("constructor")
        this.state = {
            classCodes: null,
            coursesData: null,
        };  
  
        getDoc(this.props.userRef)
            .then((userSnap) => {
                console.log("weee")
                this.setState({
                    classCodes: userSnap.classCodes,
                }, () => {
                    // callback because must wait for classCodes to be populated
                    this.populateCourseReferences();
                    console.log(this.state.classCodes)
                })
            });
    }

    populateCourseReferences = () => {
        // Loop through IDs and fetch documents
        const courseIdArray = this.state.classCodes;
        const courseDocProms = courseIdArray.map((courseid) => {
            const courseRef = doc(courseid);
            return getDoc(courseRef)
                .then((courseSnapshot) => {
                    if (courseSnapshot.exists) {
                        return { ...courseSnapshot.data() };
                    } else {
                        // Handle non-existent documents
                        return null;
                    }
                });
        });

        Promise.all(courseDocProms)
            .then((fetchedCourses) => {
                const filteredCourses = fetchedCourses.filter(Boolean); // Filter out null values
                this.setState({ 
                    coursesData: filteredCourses 
                }, 
                () => {console.log(this.state.coursesData)
                });
            });

        
    }

    render() {
        return <div>StudentCoursesL istPage cahn ge</div>
    }
}

export default StudentCoursesListPage;