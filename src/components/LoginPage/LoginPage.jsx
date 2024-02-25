import React, { Component } from 'react';
import SignInButton from './SignInButton';
import { Row, Col, ToggleButton, Card } from 'react-bootstrap';

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
        return (
            <div style={{textAlign:"center"}}>
                {/* <Row>
                    <Col>
                        <h1 className="text-center">Welcome to SQueaL</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SignInButton {...this.props} isInstructor={this.state.isInstructor} ></SignInButton>
                    </Col>
                </Row> */}
                <Card style={{ textAlign: 'center', backgroundColor: "var(--background)", margin: "10px" }}>
                    <Card.Header as={"h3"} className="text-center">
                        Welcome to SQueaL
                    </Card.Header>
                    <Card.Body style={{ backgroundColor: "var(--background)" }}>
                        <ToggleButton
                            onClick={this.isInstructorClicked}
                            style={{marginTop: "10px"}}
                            >
                            {this.state.isInstructor ? 'Signing in as Instructor' : 'Signing in as Student'}
                        </ToggleButton>
                        <SignInButton {...this.props} isInstructor={this.state.isInstructor} ></SignInButton>
                    </Card.Body>
                    {/* {this.state.correct ? <p className="confirmation">Correct! "{this.state.optionSelectedString}"</p> : this.state.indexChecked != -1 ? <p className="confirmation">Incorrect</p> : <></>}  */}
                </Card>
            </div>
        )
    }
}

export default LoginPage;