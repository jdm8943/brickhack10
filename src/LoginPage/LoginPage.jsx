import React, { Component } from 'react';
import SignInButton from '../firebase/SignInButton';

class LoginPage extends Component {
    static defaultProps = {}
    state = {};

    render (){
        return <SignInButton></SignInButton>
    }
}

export default LoginPage;