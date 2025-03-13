import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { server } from "../remote/server";
import { UserContext } from "./UserContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const {user} = useContext(UserContext)
    const [isAnnouncementsLoading, setIsAnnouncementsLoading] = useState(true)
    const [announcements, setAnnouncements] = useState([]);
      
    




    const fetchAnnouncementsByUser = async (userId) => {
    
      try {
        const response = await fetch(`${server}/api/datas/announcements/user/${userId}`, {
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
        return data.data; // Retourner les annonces récupérées
      } catch (error) {
        console.error("Erreur:", error.message);
        return []; // Retourner un tableau vide en cas d'erreur
      }
    }


    const fetchAnnouncements = async (page, limit) => {
      try {
        console.log("ok")
        const response = await fetch(`${server}/api/datas/announcements/page?page=${page}&limit=${limit}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error(`Erreur de récupération des annonces: ${response.statusText}`);
        }
    
        // Récupérer les données au format JSON
        const data = await response.json();
        return data; // Retourner les annonces récupérées
      } catch (error) {
        console.error("Erreur:", error.message);
        return []; 
      }
      
  };
    

  useEffect(() => {
    const fetchData = async () => {
      setIsAnnouncementsLoading(true);
      const result = await fetchAnnouncementsByUser(user._id);
      //console.log(result)
      setAnnouncements(result);
      setIsAnnouncementsLoading(false);
    };

    if(isAnnouncementsLoading)
    {
      fetchData();
    }
    

  }, [user, isAnnouncementsLoading]);

    


    const stateVars = {user, isAnnouncementsLoading, announcements}
    const stateFunctions = {setIsAnnouncementsLoading, setAnnouncements}
    const utilFunctions = {fetchAnnouncementsByUser, fetchAnnouncements}


  return (
    <AdminContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </AdminContext.Provider>
  );
};
