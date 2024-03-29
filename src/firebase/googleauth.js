import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
class GoogleAuth extends Component{
    constructor(firebase) {
        this.auth = firebase.getAuth();
        this.provider = new GoogleAuthProvider();
    }

    async signIn() {
        try {
            const result = await signInWithPopup(this.auth, this.provider);
            // Handle successful sign-in here (e.g., store user data)
            return result.user;
        } catch (error) {
            console.error("Error signing in:", error);
            return null;
        }
    }
}

export default GoogleAuth;