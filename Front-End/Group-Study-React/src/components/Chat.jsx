import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";

import "../App.css";

const Chat = ({ socket }) => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const username = sessionStorage.getItem("userName");
		if (!username) {
			navigate("/");
		}

		if (!socket || !socket.id) {
			navigate("/joinchat");
		}
	}, [navigate, socket]);

	const { room } = location.state || {};
	const username = sessionStorage.getItem("userName");

	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					":" +
					new Date(Date.now()).getMinutes(),
			};

			await socket.emit("send_message", messageData);
			setMessageList((list) => [...list, messageData]);
			setCurrentMessage("");
		}
	};

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket, room]);

	const [isRecording, setIsRecording] = useState(false);

	return (
		<div className='chat-window'>
			<div className='chat-header'>
				<p>Live Chat</p>
				<p>Room: {room}</p>
			</div>
			<div className='chat-body'>
				<ScrollToBottom className='message-container'>
					{messageList.map((messageContent) => {
						return (
							<div
								className='message'
								id={username === messageContent.author ? "you" : "other"}>
								<div>
									<div className='message-content'>
										<p>{messageContent.message}</p>
									</div>
									<div className='message-meta'>
										<p id='time'>{messageContent.time}</p>
										<p id='author'>{messageContent.author}</p>
									</div>
								</div>
							</div>
						);
					})}
				</ScrollToBottom>
			</div>
			<div className='chat-footer'>
				<button className={`record-button ${isRecording ? "recording" : ""}`}>
					🎙️
				</button>

				<input
					type='text'
					value={currentMessage}
					placeholder='Type a message'
					onChange={(event) => {
						setCurrentMessage(event.target.value);
					}}
					onKeyPress={(event) => {
						event.key === "Enter" && sendMessage();
					}}
				/>
				<button onClick={sendMessage}>&#9658;</button>
			</div>
		</div>
	);
};
export default Chat;
