import React, { Component } from 'react';
import InstructorCoursesPage from '../InstructorCoursesPage/InstructorCoursesPage'
import InstructorSettingsPage from '../InstructorSettingsPage/InstructorSettingsPage'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';



class InstructorPage extends Component {
    static defaultProps = {}
    state = {
        page: null,
    }

    renderPage = () => {
            switch (this.state.page) {
                case "courses":
                    return  <InstructorCoursesPage {...this.props}/>;
                case "settings": 
                    return <InstructorSettingsPage {...this.props}/>;
            }
    }

    componentDidMount = () => {
        fetch('http://localhost:8001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: 'value' }),
            mode: 'no-cors'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the response from the server
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render = () => {
        return (
            <>
                <Row>
                    <Col>
                        <Navbar bg="dark" data-bs-theme="dark">
                            <Container>
                                <Nav className="me-auto">
                                    <Nav.Link href="#courses" onClick={() =>this.setState({page:'courses'})}>Courses</Nav.Link>
                                    <Nav.Link href="#settings" onClick={() =>this.setState({page:'settings'})}>Settings</Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.renderPage()}
                    </Col>
                </Row>
            </>
        )
    }
}

export default InstructorPage;