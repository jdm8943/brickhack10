import React, { Component } from 'react';
import { Button, Row, Col, Form, InputGroup, FormGroup } from 'react-bootstrap';
import { getFirestore, collection, getDocs, query, doc, getDoc, where, setDoc } from "firebase/firestore";
class StudentProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.displayName, // Initialize state with the default userName
            email: this.props.email,
            userRef: this.props.userRef,
            ELO: 0,
        };
    }

    componentDidMount = () => {
        getDoc(this.state.userRef)
            .then((usersSnapshot) => {
                this.setState({
                    ELO: usersSnapshot.data().ELO,
                }, () => {console.log(this.state.ELO)})
            })
    }
    
    

    // handleInputChange = (e) => {
    //     this.setState({
    //         userName: e.target.value // Update userName in state as user types
    //     });
    // };

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
                                <Form.Control defaultValue={this.state.userName} onChange={e => this.handleInputChange(e)} />
                                <Button disabled variant="outline-dark">
                                    Change Display Name
                                </Button>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Form.Text>ELO: {this.state.ELO}</Form.Text>
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