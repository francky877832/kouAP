import { createContext, useEffect, useState } from "react";
import { server } from "../remote/server";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({_id:"67c4712f12d662f6eeb9d7fd", username:"Francky", title:"Profesor"});
    
     const [facultyDepartments, setFacultyDepartments] = useState({});
     const [faculties, setFaculties] = useState({});

     const [activities, setActivities] = useState([])
     const [minActivities, setMinActivities] = useState([])
     const [minPoints, setMinPoints] = useState([])
     const [userForms, setUserForms] = useState([])
    const [coefs, setCoefs] = useState([]); 
    const [cases, setCases] = useState([]);


     const [isUserLoading, setIsUserLoading] = useState(true)
     const [isActivitiesLoading, setIsActivitiesLoading] = useState(true)
     const [isMinActivitiesLoading, setIsMinActivitiesLoading] = useState(true)
     const [isMinPointsLoading, setIsMinPointsLoading] = useState(true)
     const [isUserFormsLoading, setIsUserFormsLoading] = useState(true)
     const [isCasesLoading, setIsCasesLoading] = useState(true)
     const [isCoefsLoading, setIsCoefsLoading] = useState(true)



     const fetchCases = async () => {
      try {
        const response = await fetch(`${server}/api/datas/cases/case/all`, {
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
        //console.log(data)
        return data.data; // Retourner les annonces récupérées
      } catch (error) {
        console.error("Erreur:", error.message);
        return []; // Retourner un tableau vide en cas d'erreur
      }
    }


    
const fetchCoefs = async () => {
  try {
    const response = await fetch(`${server}/api/datas/cases/coef/all`, {
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
    //console.log(data)
    return data.data; // Retourner les annonces récupérées
  } catch (error) {
    console.error("Erreur:", error.message);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}
    


     
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
            //console.log(data)
            return data.data; // Retourner les annonces récupérées
          } catch (error) {
            console.error("Erreur:", error.message);
            return []; // Retourner un tableau vide en cas d'erreur
          }
        }


        // Fonction pour récupérer les activités
    const fetchActivities = async () => {
     // console.log("okk")
      try {
          //setIsLoading(true)
          const response = await fetch(`${server}/api/datas/activities/activities/all`, {  
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
          },})

          const data = await response.json();
          if (!response.ok)  {
              throw new Error(data?.message || "Erreur lors du chargement des activités");
          }

        console.log(data.data)
        return data?.data
      } catch (err) {
          console.log(err);
      } finally {
          //setIsLoading(false)
      }
  };



  const fetchMinActivities = async () => {
    // console.log("okk")
     try {
         //setIsLoading(true)
         const response = await fetch(`${server}/api/datas/activities/minActivities/all`, {  
             method: "GET",
             headers: {
                 "Content-Type": "application/json",
         },})

         const data = await response.json();
         if (!response.ok)  {
             throw new Error(data?.message || "Erreur lors du chargement des activités");
         }

       console.log(data.data)
       return data?.data
     } catch (err) {
         console.log(err);
     } finally {
         //setIsLoading(false)
     }
 };


 const fetchMinPoints= async () => {
  // console.log("okk")
   try {
       //setIsLoading(true)
       const response = await fetch(`${server}/api/datas/activities/minPoints/all`, {  
           method: "GET",
           headers: {
               "Content-Type": "application/json",
       },})

       const data = await response.json();
       if (!response.ok)  {
           throw new Error(data?.message || "Erreur lors du chargement des activités");
       }

     console.log(data.data)
     return data?.data
   } catch (err) {
       console.log(err);
   } finally {
       //setIsLoading(false)
   }
};



const fetchUserForms= async () => {
  // console.log("okk")
   try {
       //setIsLoading(true)
       const response = await fetch(`${server}/api/datas/forms/get/all`, {  
           method: "GET",
           headers: {
               "Content-Type": "application/json",
       },})

       const data = await response.json();
       if (!response.ok)  {
           throw new Error(data?.message || "Erreur lors du chargement des activités");
       }

     //console.log(data.data)
     return data?.data
   } catch (err) {
       console.log(err);
   } finally {
       //setIsLoading(false)
   }
};




     useEffect(() => {
            const fetchFacultiesEffect = async () => {
                setIsUserLoading(true)
                const fac = await fetchFaculties()
                setFacultyDepartments(fac)
                setFaculties(fac)
                setIsUserLoading(false)
            };

            if(isUserLoading)
            {
              fetchFacultiesEffect();
            }
           
        }, [facultyDepartments, isUserLoading]);



        useEffect(() => {
          const fetchActivitiesEffect = async () => {
              setIsActivitiesLoading(true)
              const act = await fetchActivities()
              setActivities(act)
              setIsActivitiesLoading(false)
          };

          if(isActivitiesLoading)
          {
            fetchActivitiesEffect();
          }
         
      }, [isActivitiesLoading]);


      
      useEffect(() => {
        const fetchMinActivitiesEffect = async () => {
            setIsMinActivitiesLoading(true)
            const act = await fetchMinActivities()
            setMinActivities(act)
            setIsMinActivitiesLoading(false)
        };

        if(isMinActivitiesLoading)
        {
          fetchMinActivitiesEffect();
        }
       
    }, [isMinActivitiesLoading]);

    useEffect(() => {
      const fetchMinPointsEffect = async () => {
          setIsMinPointsLoading(true)
          const act = await fetchMinPoints()
          //console.log(act)
          setMinPoints(act)
          setIsMinPointsLoading(false)
      };

      if(isMinPointsLoading)
      {
        fetchMinPointsEffect();
      }
     
  }, [isMinPointsLoading]);


  useEffect(() => {
    const fetchUserFormsEffect = async () => {
      setIsUserFormsLoading(true)
        const act = await fetchUserForms()
        //console.log(act)
        setUserForms(act)
        setIsUserFormsLoading(false)
    };

    if(isUserFormsLoading)
    {
      fetchUserFormsEffect();
    }
   
}, [isUserFormsLoading]);


 useEffect(() => {
      const fetchCasesEffect = async () => {
        setIsCasesLoading(true)
          const act = await fetchCases()
          //console.log(act)
          setCases(act)
          setIsCasesLoading(false)
      };
  
      if(isCasesLoading)
      {
        fetchCasesEffect();
      }
     
  }, [isCasesLoading]);

  useEffect(() => {
    const fetchCoefsEffect = async () => {
      setIsCoefsLoading(true)
        const act = await fetchCoefs()
        //console.log(act)
        setCoefs(act)
        setIsCoefsLoading(false)
    };

    if(isCoefsLoading)
    {
      fetchCoefsEffect();
    }
   
}, [isCoefsLoading]);




        const stateVars = {user, isUserLoading, faculties, facultyDepartments, isActivitiesLoading, activities, isMinActivitiesLoading,
           minActivities, isMinPointsLoading, minPoints, userForms, isUserFormsLoading,
           cases, coefs, isCasesLoading, isCoefsLoading
          
          }
        const stateFunctions = {setIsUserLoading, setFacultyDepartments, setIsActivitiesLoading, setIsCasesLoading, setIsCoefsLoading}
        const utilFunctions = {fetchFaculties, fetchActivities, fetchMinActivities, fetchMinPoints, fetchUserForms, 
          fetchCases, fetchCoefs
        }

  return (
    <UserContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </UserContext.Provider>
  );
};
