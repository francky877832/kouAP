import React, { useContext } from 'react';
import { Navigate , Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  //const user = JSON.parse(localStorage.getItem('user')); // Récupérer l'utilisateur connecté depuis localStorage (ou contexte global)
  const user = useContext(UserContext)

  // Vérifiez si l'utilisateur est connecté et si son rôle est "manager"
  if (!user || user.role != role) {
    return <Navigate  to="/access-denied" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
