import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import StudentCoursePage from './StudentCoursePage';
import { getFirestore, collection, getDocs, query, doc, getDoc, where, setDoc } from "firebase/firestore";
import StudentCourseCard from './StudentCourseCard';
class StudentCoursesListPage extends Component {
    constructor(props) {
        super(props);
        // console.log("constructor")
        this.state = {
            classCodes: null,
            coursesData: null,
        };


    }

    componentDidMount = () => {
        getDoc(this.props.userRef)
            .then((userSnap) => {
                // console.log(userSnap.data());
                const udata = userSnap.data();
                this.setState({
                    classCodes: udata.classCodes.map((ref) => {
                        return ref.id
                    }
                    ),
                }, () => {
                    // callback because must wait for classCodes to be populated
                    // console.log(this.state.classCodes)
                    this.populateCourseReferences();

                })
            });
    }

    populateCourseReferences = () => {
        // Loop through IDs and fetch documents
        const courseIdArray = this.state.classCodes;
        const courseCol = collection(this.props.firestoredb, "Courses");
        const courseDocProms = courseIdArray.map((courseid) => {
            const courseRef = doc(courseCol, courseid);
            return getDoc(courseRef)
                // async to let us await getDoc later
                .then(async (courseSnapshot) => {
                    const cData = courseSnapshot.data();
                    console.log(cData);
                    console.log(cData.instructor.id);

                    if (courseSnapshot.exists) {
                        // get instructor info
                        const instrInfo = await getDoc(doc(collection(this.props.firestoredb, "Users"), cData.instructor.id))
                            .then((instrSnapshot) => {
                                if (instrSnapshot.exists) {
                                    return instrSnapshot.data();
                                } else {
                                    return { displayName: "No Instructor" }
                                }
                            });
                        // console.log(instrInfo)
                        return { ...cData, ...instrInfo, courseId: courseid }
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
                }
                    // , () => { console.log(this.state.coursesData) }
                );
            });


    }

    render = () => {
        return (
            <Row xs={1} md={3} className="g-4">
                {this.state.coursesData ? (
                    this.state.coursesData.map((information) => (
                        <Col key={information.name}>
                            <StudentCourseCard {...information} />
                        </Col>
                    ))
                ) : (
                    <p>Loading Courses...</p>
                )}
            </Row>
        );

    }
}

export default StudentCoursesListPage;