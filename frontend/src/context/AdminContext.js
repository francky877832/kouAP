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
       // console.log("ok")
        const response = await fetch(`${server}/api/datas/announcements/page?page=${page}&limit=${limit}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.token}`,
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


  

const fetchApplications = async () => {
  // console.log("okk")
   try {
       //setIsLoading(true)
       const response = await fetch(`${server}/api/datas/applications/get/all`, {  
           method: "GET",
           headers: {
               "Content-Type": "application/json",
       },})

       const data = await response.json();
       if (!response.ok)  {
           throw new Error(data?.message || "Erreur lors du chargement des applicaitons");
       }

     //console.log(data.data)
     return data?.data
   } catch (error) {
      alert(error)
       console.log(error);
   } finally {
       //setIsLoading(false)
   }
}

  
const updateApplicationStatus = async (updatedApp) => {
  try {

    const response = await fetch(`${server}/api/datas/applications/update/decision${updatedApp._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedApp),
    });

const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update application');
    }
    return data.data
    //setIsActivitiesLoading(true)
  } catch (error) {
    alert(error)
    console.error('Error updating application:', error);
    return null
  }
};

const assignApplicaitonJurys = async (updatedApp, jurorsCount, admin) => {
  try {

    const response = await fetch(`${server}/api/datas/applications/jury/assign`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({applicationId : updatedApp._id, userId:updatedApp.user._id, jurorsCount:jurorsCount, adminId:admin._id}),
    });

const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update application');
    }
    return data.data
    //setIsActivitiesLoading(true)
  } catch (error) {
    alert(error)
    console.error('Error updating application:', error);
    return null
  }
};


const fetchAdminEvaluations = async (user) => {
  // console.log("okk")
   try {
       //setIsLoading(true)
       const response = await fetch(`${server}/api/datas/evaluations/get/admin/${user._id}`, {  
           method: "GET",
           headers: {
               "Content-Type": "application/json",
       },})

       const data = await response.json();
       if (!response.ok)  {
           throw new Error(data?.message || "Erreur lors du chargement des applicaitons");
       }

     //console.log(data.data)
     return data?.data
   } catch (error) {
      alert(error)
       console.log(error);
   } finally {
       //setIsLoading(false)
   }
}

    

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
    const stateFunctions = {setIsAnnouncementsLoading, setAnnouncements,}
    const utilFunctions = {fetchAnnouncementsByUser, fetchAnnouncements,  fetchApplications, updateApplicationStatus, assignApplicaitonJurys,
      fetchAdminEvaluations
    }


  return (
    <AdminContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </AdminContext.Provider>
  );
};
