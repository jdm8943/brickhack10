import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import StudentProfilePage from '../StudentProfilePage/StudentProfilePage.jsx';
import SessionPage from '../LearningSessionPage/SessionPage.jsx'
import StudentCoursesPage from '../StudentCoursesPage/StudentCoursesPage.jsx';
import StudentGlobalLeaderboardPage from '../StudentGlobalLeaderboardPage/StudentGlobalLeaderboardPage.jsx';


class StudentPage extends React.Component {
    static defaultProps = {}
    state = {
        page: null,
    }

    renderPage = () => {
            switch (this.state.page) {
                case "profile":
                    return  <StudentProfilePage {...this.props}/>;
                case "courses":
                    return <StudentCoursesPage {...this.props}/>;
                case "learning":
                    return <SessionPage {...this.props}/>;
                case "leaderboard":
                    return <StudentGlobalLeaderboardPage {...this.props}/>;
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