import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import InstructorPage from '../InstructorPage/InstructorPage.jsx';
import StudentProfilePage from '../StudentProfilePage/StudentProfilePage.jsx';


class StudentPage extends Component {
    static defaultProps = {}
    state = {
        page: null,
    }

    renderPage = () => {
            switch (this.state.page) {
                case "profile":
                    return  <StudentProfilePage {...this.props}/>;
                case "courses":
                    //TODO: add courses Page
                    return <></>
                case "learning":
                    //TODO: add learning Page
                    return <></>
                case "leaderboard":
                    //TODO: add leaderboard Page
                    return <></>
            }
    }

    render = () => {
        return (
            <>
                <Row>
                    <Col>
                        <Navbar bg="dark" data-bs-theme="dark">
                            <Container>
                                <Nav className="me-auto">
                                    <Nav.Link href="#profile" onClick={() => this.setState({ page: 'profile' })}>Profile</Nav.Link>
                                    <Nav.Link href="#courses" onClick={() =>this.setState({page:'courses'})}>Courses</Nav.Link>
                                    <Nav.Link href="#learning" onClick={() =>this.setState({page:'learning'})}>Learning</Nav.Link>
                                    <Nav.Link href="#leaderboard" onClick={() =>this.setState({page:'leaderboard'})}>Leaderboard</Nav.Link>
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
export default StudentPage;