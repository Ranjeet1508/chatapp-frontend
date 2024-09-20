import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChatWindow from '../Component/ChatWindow';
import LoginForm from '../Component/LoginForm';
import SignupForm from '../Component/SignupForm';
import { AuthContext } from '../Contexts/AuthContext';
import ChatApp from '../Component/ChatApp';

// Protected route component to check if user is authenticated
const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return user ? children : <Navigate to="/login" />;
};

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginForm />} />
      <Route path='/signup' element={<SignupForm />} />
      <Route path='/chatwindow' element={<ChatWindow/>} />
      
      {/* Protect the ChatWindow route */}
      <Route 
        path='/' 
        element={
          <ProtectedRoute>
            <ChatApp />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default AllRoutes;

