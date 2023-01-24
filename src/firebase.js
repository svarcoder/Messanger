import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyBXNVOvfTJXj-S9nJ4REnjXYZ7E1_SPc4g",
	authDomain: "messanger-5eff5.firebaseapp.com",
	projectId: "messanger-5eff5",
	storageBucket: "messanger-5eff5.appspot.com",
	messagingSenderId: "542822806712",
	appId: "1:542822806712:web:e92e2218a627c4e5b0704d",
	measurementId: "G-R3VRFWF4XP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
