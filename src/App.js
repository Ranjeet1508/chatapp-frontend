import React, { useContext } from 'react';
import './index.css'; // Importing global styles here
import { AuthContext, AuthProvider } from './Contexts/AuthContext';
import AllRoutes from './AllRoutes/AllRoutes';

const App = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AuthProvider>
      <h3 style={{textAlign:"center"}}>Hi {user?.name}!</h3>
      <div className="app-container">
        <AllRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;

