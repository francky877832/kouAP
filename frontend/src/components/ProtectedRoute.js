import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const { user } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true); 
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setIsAuthenticated(true); 
      } else {
        setIsAuthenticated(false); 
      }
    }
  }, [user]);

  if (!isAuthenticated || !roles?.includes(user?.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
