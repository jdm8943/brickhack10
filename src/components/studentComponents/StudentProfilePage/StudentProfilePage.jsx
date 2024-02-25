import React, { Component } from 'react';
import { Button, Row, Col, Form, InputGroup, FormGroup } from 'react-bootstrap';
import { getFirestore, collection, getDocs, query, doc, getDoc, where, setDoc } from "firebase/firestore";
class StudentProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.displayName, // Initialize state with the default userName
            userInputName: "",
            email: this.props.email,
            userRef: this.props.userRef,
            ELO: 0,
        };
    }

    componentDidMount = () => {
        getDoc(this.state.userRef)
            .then((usersSnapshot) => {
                const uData = usersSnapshot.data()
                console.log(uData)
                this.setState({
                    ELO: uData.elo
                }, () => { console.log(this.state.ELO) })
            })
    }


    handleInputChange = (e) => {
        this.setState({
            userInputName: e.target.value // Update userName in state as user types
        });
    };

    // need to do css shit :sob:

    render = () => {
        return (
            <div bg="dark" data-bs-theme="dark">
                <Row>
                    <Col xs={8}>
                        <h1>
                            Welcome, {this.state.userName}
                        </h1>
                    </Col>
                    <Col>
                        <h2>ELO: {this.state.ELO}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <InputGroup>
                            <Form.Control defaultValue={this.state.userName} onChange={e => this.handleInputChange(e)} />
                            <Button disabled variant="outline-dark" onClick={(e) => { this.updateDisplayName(e) }}>
                                Change Display Name
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}

// TODO: uncomment this later once we have more setup
// StudentProfilePage.propTypes = {
//     userName: PropTypes.string.isRequired
// };

export default StudentProfilePage;