import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinChat.css";

const JoinChat = ({ socket }) => {
	const navigate = useNavigate();
	useEffect(() => {
		const username = sessionStorage.getItem("userName");
		if (!username) {
			navigate("/");
		}
	}, [navigate]);

	const [chatCode, setChatCode] = useState("");

	const handleChange = (event) => {
		setChatCode(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const username = sessionStorage.getItem("userName");
		if (username !== "" && chatCode !== "") {
			socket.emit("join_room", chatCode);
			navigate("/chat", {
				state: {
					room: chatCode,
				},
			});
		}
	};

	return (
		<div className='join-chat-container'>
			<div className='join-chat-form'>
				<h1 className='join-chat-title'>Join a Chat</h1>
				<form onSubmit={handleSubmit}>
					<label className='join-chat-label'>
						Enter the chat code:
						<input
							className='join-chat-input'
							type='text'
							value={chatCode}
							onChange={handleChange}
						/>
					</label>
					<button className='join-chat-button' type='submit'>
						Join
					</button>
				</form>
			</div>
		</div>
	);
};

export default JoinChat;
