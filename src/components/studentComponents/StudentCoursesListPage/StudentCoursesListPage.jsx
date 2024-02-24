import React, { Component } from 'react';

class StudentCoursesPage extends Component {
    static defaultProps = {
        userName: "spenc",
        userGlobalElo: "Diamond",
    };
    
    state = {}

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

export default StudentCoursesPage;