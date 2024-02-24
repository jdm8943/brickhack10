import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

class StudentPage extends Component {
    static defaultProps = {}
    state = {

    }

    renderPage = () => {
        return (
            <></>
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