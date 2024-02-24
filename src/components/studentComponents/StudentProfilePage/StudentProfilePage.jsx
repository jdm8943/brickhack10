import React, { Component } from 'react';
import { Button, Row, Col, Form, InputGroup, FormGroup } from 'react-bootstrap';

class StudentProfilePage extends Component {
    // TODO: change Later
    static defaultProps = {
        userName: "spenc",
        userGlobalElo: "Diamond",
    };
    
    state = {
        userName: this.props.userName // Initialize state with the default userName
    };
    
    onSubmit = () => {
        console.log(this.state.userName); // Access userName from state instead of props
    };

    handleInputChange = (e) => {
        this.setState({
            userName: e.target.value // Update userName in state as user types
        });
    };

    // need to do css shit :sob:

    render = () => {
        return (
            <>
                <Row>
                    <Col>
                        <div bg="dark" data-bs-theme="dark">
                            <h1>
                                Welcome, {this.state.userName}
                            </h1>
                            <InputGroup>
                                <Form.Control defaultValue={this.props.userName} onChange={e => this.handleInputChange(e)} />
                                <Button variant="outline-dark" onClick={this.onSubmit}>
                                    Change Display Name
                                </Button>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
            </>
            
            )
    }
}

// TODO: uncomment this later once we have more setup
// StudentProfilePage.propTypes = {
//     userName: PropTypes.string.isRequired
// };

export default StudentProfilePage;