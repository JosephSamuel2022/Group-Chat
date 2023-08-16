import React from "react";
import JoinChat from "./components/JoinChat";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("https://groupchatbackend.onrender.com");

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Auth />} />
				<Route path='/chat' element={<Chat socket={socket} />} />
				<Route path='/joinchat' element={<JoinChat socket={socket} />} />
			</Routes>
		</div>
	);
}

export default App;
