import { createContext, useCallback, useContext, useState } from "react";
import { server } from "../remote/server";
import { UserContext } from "./UserContext";
import { redirectNonAuthenticatedUser } from "../utils/utilsFunctions";

export const JuryContext = createContext();

export const JuryProvider = ({ children }) => {
    //const [user, setUser] = useState({_id:"67c40819dd1edec92edce9f2", username:"Francky", title:"Profesor"});

    const { user } = useContext(UserContext)
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');
    const [juryReport, setJuryReport] = useState(null);
    const [error, setError] = useState(null);

    // Fonction pour gérer la soumission des données
    const submitEvaluation = async (formData, application) => {
        //console.log(juryReport)
        try {
            //console.log(application)
            //console.log(jury)
            

            const response = await fetch(`${server}/api/datas/evaluations/add`, {
                method: 'POST',
                headers : {
                    "Authorization": `Bearer ${user.token}`,
                },
                body: formData, // Envoi des données avec le fichier
            });

            const data = await response.json();


            if (!response.ok) {
                            redirectNonAuthenticatedUser(data);
                
                throw new Error('Erreur lors de la soumission de l\'évaluation');
            }

            return data.data; // Retourne la réponse du backend
        } catch (error) {
            setError(error.message);
            console.error('Erreur:', error);
        }
    };


    const fetchJuryApplications = async (juryId) => {
        try {
            const response = await fetch(`${server}/api/datas/applications/jury/${juryId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                            redirectNonAuthenticatedUser(data);
                
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
    
            const data = await response.json();
            return data.data; // Retourne les applications assignées au jury
        } catch (error) {
            console.error("Erreur lors de la récupération des candidatures:", error);
            return null;
        }
    }






    const fetchJuryEvaluation = async (applicationId, juryId) => {
        try {
            const response = await fetch(`${server}/api/datas/evaluations/get/jury?applicationId=${applicationId}&juryId=${juryId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
            });
            
            const data = await response.json();

            if (!response.ok)
            {
                redirectNonAuthenticatedUser(data);

                throw new Error( data.error || "Erreur lors de la récupération de l'évaluation");
            } 
    
           // console.log(data.data)
            return data.data;
        } catch (error) {
            console.log("Error while", error)
            return false;
        }
    };
    

    


    const stateVars = {}
    const stateFunctions = {}
    const utilFunctions = {fetchJuryApplications, submitEvaluation, fetchJuryEvaluation }

  return (
    <JuryContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </JuryContext.Provider>
  );
};
