import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({_id:"67c40819dd1edec92edce9f2", username:"Francky", title:"Profesor"});


    const stateVars = {user}
    const stateFunctions = {}
    const utilFunctions = {}







  return (
    <UserContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </UserContext.Provider>
  );
};
