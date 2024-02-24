import React, { useState } from "react";
import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";

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
    console.log(this.state)
    this.setState((prevState) => {
      return {
        analytics: getAnalytics(prevState.app),
        db: getFirestore(prevState.app),
        auth: getAuth(prevState.app),
        provider: new GoogleAuthProvider(),
      }
      }, console.log(this.state))
  }

async signIn() {
  console.log(this.state)
    try {
        const result = await signInWithPopup(this.state.auth, this.state.provider);
        // Handle successful sign-in here (e.g., store user data)
        return result.user;
    } catch (error) {
        console.error("Error signing in:", error);
        return null;
    }
}

  state = {
    user: null,
  };

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
          <button onClick={this.handleSignIn}>Sign in with Google</button>
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
