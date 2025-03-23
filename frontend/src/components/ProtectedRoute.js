import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Loading from './Loading';

/*
useEffect(() => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
      setAuthState({ token, user: JSON.parse(user) });
  }
}, []);
*/
const ProtectedRoute = ({ element: Component, roles, isLoading, /*isAuthenticated, user,*/ ...rest }) => {
  
    const {user, setUser, isAuthenticated, setIsAuthenticated  } = useContext(UserContext);

    const [token, setToken] = useState(null)
    const [storedUser, setStoredUser] = useState(user)
    /*useEffect(() => {
      const token = localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setToken(token)
      setStoredUser(storedUser)
      alert(token)
    }, [])*/
  
   

  //if ((token && storedUser) && !roles?.includes(storedUser?.role)) {
  if(!isLoading){
 

  if(isAuthenticated && !roles?.includes(storedUser?.role)){
    return <Navigate to="/access-denied" replace />;
  }

  //if(!(token && storedUser)){
  if(!isAuthenticated)
  {
    return <Navigate to="/login" replace />;

  }

  return <Component {...rest} />;
}
else
{
  return <Loading/>
}
};

export default ProtectedRoute;
