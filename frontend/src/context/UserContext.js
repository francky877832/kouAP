import { createContext, useEffect, useState } from "react";
import { server } from "../remote/server";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({_id:"67c4712f12d662f6eeb9d7fd", username:"Francky", title:"Profesor"});
    
     const [facultyDepartments, setFacultyDepartments] = useState({});
     const [isUserLoading, setIsUserLoading] = useState(true)
    
    
        const fetchFaculties = async (userId) => {
          try {
            const response = await fetch(`${server}/api/datas/faculties/get`, {
              method: "GET", // Méthode GET pour récupérer les annonces
              headers: {
                "Content-Type": "application/json",
              },
            });
        
            if (!response.ok) {
              throw new Error(`Erreur de récupération des annonces: ${response.statusText}`);
            }
        
            // Récupérer les données au format JSON
            const data = await response.json();
            console.log(data)
            return data.data; // Retourner les annonces récupérées
          } catch (error) {
            console.error("Erreur:", error.message);
            return []; // Retourner un tableau vide en cas d'erreur
          }
        }

     useEffect(() => {
            const fetchFacultiesEffect = async () => {
                setIsUserLoading(true)
                const fac = await fetchFaculties()
                setFacultyDepartments(fac)
                setIsUserLoading(false)
            };

            if(isUserLoading)
            {
              fetchFacultiesEffect();
            }
           
        }, [facultyDepartments, isUserLoading]);



        const stateVars = {user, isUserLoading, facultyDepartments}
        const stateFunctions = {setIsUserLoading, setFacultyDepartments}
        const utilFunctions = {fetchFaculties}

  return (
    <UserContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </UserContext.Provider>
  );
};
