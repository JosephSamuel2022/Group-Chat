// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCPmCE9Aiki8kwuJSbL-swKwAuZKxi-AXI",
	authDomain: "groupstudy-e6893.firebaseapp.com",
	projectId: "groupstudy-e6893",
	storageBucket: "groupstudy-e6893.appspot.com",
	messagingSenderId: "234389086887",
	appId: "1:234389086887:web:70e2419041ed78b2927182",
	measurementId: "G-7RZ9N7N5PM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
