import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('chat-user'));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://chat-app-murex-eta.vercel.app/user/login', {
        email, password
      });
      if (response.data.status) {
        localStorage.setItem('chat-user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate('/');
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post('https://chat-app-murex-eta.vercel.app/user/register', {
        name, email, password
      });
      if (response.data.status) {
        navigate('/login');
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('chat-user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
