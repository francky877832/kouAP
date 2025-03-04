import { createContext, useState } from "react";
import { server } from "../remote/server";

export const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
    const [user, setUser] = useState(null);




    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les activités
    const fetchActivities = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/activities");
            const data = await response.json();
            if (response.ok) {
                setActivities(data);
            } else {
                throw new Error(data.message || "Erreur lors du chargement des activités");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour créer une nouvelle activité
    const createActivity = async (newActivity) => {
        console.log(newActivity)
        try {

           const response = await fetch(`${server}/api/datas/activities/activity/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newActivity),
            });

            const data = await response.json();
            if (response.ok) {
                setActivities((prev) => [...prev, data]); // Mise à jour locale
            } else {
                throw new Error(data.message || "Erreur lors de la création de l'activité");
            }
            return true;
        } catch (err) {
            console.log('An error occured', err)
            return false
        } finally {
            
        }
    };


    const stateVars = {user}
    const stateFunctions = {}
    const utilFunctions = {createActivity, }


  return (
    <ManagerContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </ManagerContext.Provider>
  );
};
