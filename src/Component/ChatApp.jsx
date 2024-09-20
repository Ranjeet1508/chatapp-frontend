import React, { useState, useEffect, useContext } from 'react';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import axios from 'axios';
import { AuthContext } from '../Contexts/AuthContext';

const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`https://chat-app-murex-eta.vercel.app/user/allusers/${user?._id}`);
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="chat-app">
      <UserList users={users} onSelectUser={setSelectedUserId} />
      <ChatWindow selectedUserId={selectedUserId} />
    </div>
  );
};

export default ChatApp;

