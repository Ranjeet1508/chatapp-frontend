import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';

const socket = io('http://localhost:8080');

const ChatWindow = ({ selectedUserId }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            socket.emit('add-user', user._id);

            socket.on('msg-recieve', (msg) => {
                setMessages((prevMessages) => [...prevMessages, { fromSelf: false, message: msg }]);
            });

            return () => socket.off('msg-recieve');
        }
    }, [user]);

    const sendMessage = async () => {
        if (message.trim() !== '') {
            const newMessage = { from: user._id, to: selectedUserId, message: message };
            await axios.post('https://chat-app-murex-eta.vercel.app/messages/addMessage', newMessage);
            setMessages((prevMessages) => [...prevMessages, { fromSelf: true, message: message }]);
            socket.emit('send-msg', newMessage);
            setMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if in a form
            sendMessage();
        }
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.fromSelf ? 'self' : 'other'}`}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress} 
                placeholder="Type your message"
            />
            <button onClick={sendMessage} disabled={!message.trim()}>Send</button> 
        </div>
    );
};

export default ChatWindow;


