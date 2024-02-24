import React, { Component } from 'react';
import SignInButton from '../firebase/SignInButton';
import { Row, Col } from 'react-bootstrap';

class LoginPage extends Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {}
    state = {};

    render() {
        return <>
            <Row>
                <Col>
                    <h1 className="text-center">Welcome to SQueaL</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <SignInButton {...this.props}></SignInButton>
                </Col>
            </Row>

        </>
    }
}

export default LoginPage;