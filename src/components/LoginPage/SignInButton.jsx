import React, { useState } from "react";
import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import { Button } from 'react-bootstrap'

class SignInButton extends React.Component {
    constructor(props) {
        super(props);

        let firebaseConfig = {
            apiKey: "AIzaSyDvsrgc09GqGD8y3a3H3G0xEdtx7vxF5Fg",
            authDomain: "brickhack10.firebaseapp.com",
            projectId: "brickhack10",
            storageBucket: "brickhack10.appspot.com",
            messagingSenderId: "1090128869892",
            appId: "1:1090128869892:web:cc063de784b73b2842d351",
            measurementId: "G-4J4WL8FHTK",
        };

        this.state = {
            app: initializeApp(firebaseConfig),
            analytics: null,
            db: null,
        }
    }

    componentDidMount() {
        this.setState((prevState) => {
            return {
                analytics: getAnalytics(prevState.app),
                db: getFirestore(prevState.app),
                auth: getAuth(prevState.app),
                provider: new GoogleAuthProvider(),
            }
        })
    }

    async signIn() {
        try {
            const result = await signInWithPopup(this.state.auth, this.state.provider);
            this.props.loginSuccessful(
                result.user.displayName, result.user.uid, this.props.isInstructor, this.state.db, result.user.email
            );
            // Handle successful sign-in here (e.g., store user data)
            return result.user;
        } catch (error) {
            console.error("Error signing in:", error);
            return null;
        }
    }

    handleSignIn = async () => {
        const user = await this.signIn();
        if (user) {
            this.setState({ user });
        }
    };

    render() {
        const { user } = this.state;

        return (
            <div>
                {!user ? (
                    <Button onClick={this.handleSignIn} style={{ marginTop: "10px" }}>Sign in with Google</Button>
                ) : (
                    <div>
                        Welcome, {user.displayName}!
                    </div>
                )}
            </div>
        );
    }
}

export default SignInButton;
