import React, { useState } from "react";
import { MyFirebase } from "./firebase";
import { GoogleAuth } from "./googleauth";

class SignInButton extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = new MyFirebase();
    this.firebase.initializeApp();
    this.googleAuth = new GoogleAuth(this.firebase);
  }

  state = {
    user: null,
  };

  handleSignIn = async () => {
    const user = await this.googleAuth.signIn();
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
