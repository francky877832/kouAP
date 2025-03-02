import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({_id:"67c4712f12d662f6eeb9d7fd", username:"Francky", title:"Profesor"});


    const stateVars = {user}
    const stateFunctions = {}
    const utilFunctions = {}







  return (
    <UserContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </UserContext.Provider>
  );
};
