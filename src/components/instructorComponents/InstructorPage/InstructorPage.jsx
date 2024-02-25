import React, { Component } from 'react';


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