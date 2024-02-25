import React, { Component } from 'react';

class InstructorPage extends Component {
    static defaultProps = {}
    state = {}

    componentDidMount = () => {
        fetch('http://localhost:8001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: 'value' }),
            mode: 'no-cors'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the response from the server
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render = () => {
        return <></>
    }
}

export default InstructorPage;