import React, { useState, useEffect } from "react";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { FormControl, IconButton, Input } from "@material-ui/core";

function App() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState("");

	useEffect(() => {
		db.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						message: doc.data(),
					}))
				);
			});
	}, []);

	useEffect(() => {
		let username = prompt("Please enter your name");
		console.log(username);
		if (username === "") username = "Unknown";
		setUsername(username);
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		db.collection("messages").add({
			username: username,
			message: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setTimeout(() => {
			const chat = document.querySelector("#chat");
			chat.scroll({ behavior: "smooth" });
			chat.scrollTop = chat.scrollHeight;
		}, 500);

		setInput("");
	};

	return (
		<div className='App'>
			<div className='container'>
				<div className='header'>
					<img
						className='header__logo'
						src='Facebook_Messenger_logo_2020.svg'
						alt='messenger logo'
					/>
					<h1 className='header__title'>Messenger App</h1>
					<h2 className='header__subtitle'>Welcome {username}</h2>
				</div>

				<div id='chat' className='messageList'>
					<FlipMove>
						{messages.map(({ id, message }) => {
							return <Message key={id} username={username} message={message} />;
						})}
					</FlipMove>{" "}
				</div>
				<div className='footer'>
					<form className='app__form'>
						<FormControl className='app__formControl'>
							<Input
								className='app__input'
								placeholder='Enter a message...'
								value={input}
								onChange={(event) => setInput(event.target.value)}
							/>

							<IconButton
								className='app__iconButton'
								disabled={!input}
								variant='contained'
								color='primary'
								type='submit'
								onClick={sendMessage}>
								<SendIcon />
							</IconButton>
						</FormControl>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
