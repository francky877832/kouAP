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
const ProtectedRoute = ({ element: Component, roles, user, ...rest }) => {
  
    const {setUser, isAuthenticated, setIsAuthenticated  } = useContext(UserContext);

    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    //alert(token)
  useEffect(() => {
    if (token && storedUser)
    {
      setUser({...storedUser, token:token})
      //alert(token)
      console.log(user)
    }

    }, [])
    

  if ((token && storedUser) && !roles?.includes(storedUser?.role)) {
    return <Navigate to="/access-denied" replace />;
  }
  
  if(!(token && storedUser))
  {
    return <Navigate to="/login" replace />;

  }

  return <Component {...rest} user={user} />;
};

export default ProtectedRoute;
