import React, { Component } from 'react';
import SignInButton from '../firebase/SignInButton';
import { Row, Col, ToggleButton } from 'react-bootstrap';

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isInstructor: false,
        };
    }
    static defaultProps = {}

    isInstructorClicked = () => {
        this.setState((prevState) => { 
            return {isInstructor: !prevState.isInstructor} 
        });
        
    }

    render() {
        return <div style={{textAlign:"center"}}>
            <Row>
                <Col>
                    <h1 className="text-center">Welcome to SQueaL</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ToggleButton
                        variant={this.state.isInstructor ? 'outline-primary' : 'primary'}
                        onClick={this.isInstructorClicked}
                        style={{marginTop: "10px"}}
                        >
                        {this.state.isInstructor ? 'Signing in as Instructor' : 'Signing in as Student'}
                    </ToggleButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <SignInButton {...this.props} isInstructor={this.state.isInstructor} ></SignInButton>
                </Col>
            </Row>

        </div>
    }
}

export default LoginPage;