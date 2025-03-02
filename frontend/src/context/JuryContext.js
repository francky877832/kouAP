import { createContext, useState } from "react";
import { server } from "../remote/server";

export const JuryContext = createContext();

export const JuryProvider = ({ children }) => {
    //const [user, setUser] = useState({_id:"67c40819dd1edec92edce9f2", username:"Francky", title:"Profesor"});

    const fetchJuryApplications = async (juryId) => {
        try {
            const response = await fetch(`${server}/api/datas/applications/jury/${juryId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
    
            const data = await response.json();
            return data.data; // Retourne les applications assignées au jury
        } catch (error) {
            console.error("Erreur lors de la récupération des candidatures:", error);
            return null;
        }
    }
    


    const stateVars = {}
    const stateFunctions = {}
    const utilFunctions = {fetchJuryApplications, }

  return (
    <JuryContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </JuryContext.Provider>
  );
};
