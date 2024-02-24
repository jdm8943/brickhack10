import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class StudentPage extends React.Component{
    static defaultProps = {}
    state = {

    }

    render = () =>{
        console.log("Rendering student page")
        return (
            <Button>Test</Button>
        )
    }
}