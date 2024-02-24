import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import InstructorPage from '../InstructorPage/InstructorPage.jsx';
import StudentProfilePage from '../StudentPage/StudentPage.jsx';


class StudentPage extends Component {
    static defaultProps = {}
    state = {
        isStudent : true,
        isLoggedIn : true,
    }

    renderPage = () => {
        return (
            this.state.isLoggedIn ? this.isStudent ? 
            <StudentProfilePage/>
            : <InstructorPage/> : <></>
            // <LoginForm></LoginForm>
        )
    }

    render = () => {
        return (
            <>
                <Row>
                    <Col>
                        <Navbar bg="dark" data-bs-theme="dark">
                            <Container>
                                <Nav className="me-auto">
                                    <Nav.Link href="#profile">Profile</Nav.Link>
                                    <Nav.Link href="#courses">Courses</Nav.Link>
                                    <Nav.Link href="#learning">Learning</Nav.Link>
                                    <Nav.Link href="#leaderboard">Leaderboard</Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    {this.renderPage()}
                </Row>
            </>
        )
    }
}
export default StudentPage;