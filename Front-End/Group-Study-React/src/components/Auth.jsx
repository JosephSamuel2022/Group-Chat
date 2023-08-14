import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { auth, provider } from "../firebase-config.js";
import GoogleIcon from "../assets/google.svg"; // Update the path to match your icon's location
import "./Auth.css";

const cookie = new Cookies();

const Auth = () => {
	const navigate = useNavigate();
	async function signInWithGoogle() {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		const username = user.displayName || "Anonymous";
		cookie.set("auth-token", result.user.refreshToken);
		sessionStorage.setItem("userName", username);
		navigate("/joinchat");
	}

	return (
		<div className='auth-container'>
			<div className='auth-header'>
				<h1 className='auth-title'>Group Chat</h1>
				<h3 className='auth-subtitle'>Sign in to continue</h3>
			</div>
			<button className='google-button' onClick={signInWithGoogle}>
				<img src={GoogleIcon} alt='Google Icon' className='google-icon' />
				<span className='google-button-text'>Sign In with Google</span>
			</button>
		</div>
	);
};

export default Auth;
