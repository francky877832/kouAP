import { createContext, useEffect, useState } from "react";
import { server } from "../remote/server";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({_id:"67c4712f12d662f6eeb9d7fd", username:"Francky", title:"Profesor", role:"admin"});
    
     const [facultyDepartments, setFacultyDepartments] = useState({});
     const [faculties, setFaculties] = useState({});
     const [facultyGroups, setFacultyGroups] = useState({});

     const [activities, setActivities] = useState([])
     const [minActivities, setMinActivities] = useState([])
     const [minPoints, setMinPoints] = useState([])
     const [userForms, setUserForms] = useState([])
    const [coefs, setCoefs] = useState([]); 
    const [cases, setCases] = useState([]);


     const [isUserLoading, setIsUserLoading] = useState(false)
     const [isFacultyLoading, setIsFacultyLoading] = useState(true)
     const [isActivitiesLoading, setIsActivitiesLoading] = useState(true)
     const [isMinActivitiesLoading, setIsMinActivitiesLoading] = useState(true)
     const [isMinPointsLoading, setIsMinPointsLoading] = useState(true)
     const [isUserFormsLoading, setIsUserFormsLoading] = useState(true)
     const [isCasesLoading, setIsCasesLoading] = useState(true)
     const [isCoefsLoading, setIsCoefsLoading] = useState(true)





     const controlUser = async (user) => {
      try {
        
        const response = await fetch(`${server}/api/users/control`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
    
        
         const data = await response.json();
         if (!response.ok) {
           throw new Error(data.error || `Erreur lors du controle du kimlik: ${response.statusText}`);
         }
         return data.data; 
      } catch (error) {
        alert(error)
        console.error(error);
      }
    }


    
    const signUpUser = async (newUser) => {
      try {
        
        const response = await fetch(`${server}/api/users/signUp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: newUser,
        });
    
        
         const data = await response.json();
         if (!response.ok) {
           throw new Error(data.error || `Cannot sign Up: ${response.statusText}`);
         }
         const user_ = data.data;
         setUser(user_)

      } catch (error) {
        alert(error)
        console.error(error);
        return null
      }
    }


     const fetchCases = async () => {
      try {
        const response = await fetch(`${server}/api/datas/cases/case/all`, {
          method: "GET", // Méthode GET pour récupérer les annonces
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        
    
        // Récupérer les données au format JSON
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || `Erreur de récupération des annonces: ${response.statusText}`);
        }
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
    


     
        const fetchFaculties = async () => {
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
            
             if (!response.ok) {
               throw new Error(data.error || `Erreur de récupération des annonces: ${response.statusText}`);
             }
            return data.data; // Retourner les annonces récupérées
          } catch (error) {
            console.error("Erreur:", error.message);
            return []; // Retourner un tableau vide en cas d'erreur
          }
        }

        const fetchFacultyGroups = async () => {
          try {
            const response = await fetch(`${server}/api/datas/faculties/get/groups`, {
              method: "GET", // Méthode GET pour récupérer les annonces
              headers: {
                "Content-Type": "application/json",
              },
            });
        
        
            // Récupérer les données au format JSON
            const data = await response.json();
            
            if (!response.ok) {
              throw new Error(data.error || `Erreur de récupération des annonces: ${response.statusText}`);
            }
            console.log(data)
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

       // console.log(data.data)
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

       //console.log(data.data)
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

     //console.log(data.data)
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
   } catch (error) {
    alert(error)
       console.log(error);
   } finally {
       //setIsLoading(false)
   }
};





     useEffect(() => {
            const fetchFacultiesEffect = async () => {
                setIsFacultyLoading(true)
                const fac = await fetchFaculties()
                const facG = await fetchFacultyGroups()
                setFacultyDepartments(fac)
                setFaculties(fac)
                setFacultyGroups(facG)
                //console.log(fac)
                setIsFacultyLoading(false)
            };

            if(isFacultyLoading)
            {
              fetchFacultiesEffect();
            }
           
        }, [facultyDepartments, isFacultyLoading]);



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
          console.log(act)
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
           cases, coefs, isCasesLoading, isCoefsLoading, isFacultyLoading,
           facultyGroups,
          
          }
        const stateFunctions = {setIsUserLoading, setFacultyDepartments, setIsActivitiesLoading, setIsCasesLoading, setIsCoefsLoading, setActivities,
          setIsUserFormsLoading, setIsFacultyLoading, setIsMinActivitiesLoading, setIsMinPointsLoading,
        }
        const utilFunctions = {fetchFaculties, fetchActivities, fetchMinActivities, fetchMinPoints, fetchUserForms, 
          fetchCases, fetchCoefs, fetchFacultyGroups,

          controlUser, signUpUser, 
        }

  return (
    <UserContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </UserContext.Provider>
  );
};
