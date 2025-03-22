import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

/*
useEffect(() => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
      setAuthState({ token, user: JSON.parse(user) });
  }
}, []);
*/
const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const { setUser, isAuthenticated, setIsAuthenticated  } = useContext(UserContext);
  
  useEffect(() => {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setIsAuthenticated(true); 
      setUser({...JSON.parse(user), token:token})
    } else {
      setIsAuthenticated(false); 
    }
  }, [user]);

  if (isAuthenticated && !roles?.includes(user?.role)) {
    return <Navigate to="/access-denied" replace />;
  }
  else if(!isAuthenticated)
  {
    return <Navigate to="/login" replace />;

  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
