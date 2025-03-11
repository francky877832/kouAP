import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { server } from "../remote/server";
import { UserContext } from "./UserContext";

export const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
    //const [user, setUser] = useState(null);
    
    const { user, isActivitiesLoading, setIsActivitiesLoading } = useContext(UserContext)



    const [activities, setActivities] = useState([]);
    const [isAcLoading, setIsLoading] = useState(true);


    const [cases, setCases] = useState([])




    const deleteCase = async (caseId) => {
      try {
        const response = await fetch(`${server}/api/datas/cases/case/delete/${caseId}`, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
              },
          });

          if (!response.ok) {
              throw new Error("Erreur lors de l'ajout du case");
          }

          const data = await response.json();
      } catch (error) {
          console.error("Erreur:", error.message);
      }
   };
   const deleteCoef = async (coefId) => {
    try {
      const response = await fetch(`${server}/api/datas/cases/coef/delete/${coefId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du case");
        }

        const data = await response.json();
    } catch (error) {
        console.error("Erreur:", error.message);
    }
};



    

    const addCase = async (newCase) => {
      try {
        console.log(newCase)
        const response = await fetch(`${server}/api/datas/cases/case/create`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(newCase),
          });

          if (!response.ok) {
              throw new Error("Erreur lors de l'ajout du case");
          }

          const data = await response.json();
      } catch (error) {
          console.error("Erreur:", error.message);
      }
  };

  
  const updateCase = async (newCase) => {
    try {
      console.log(newCase)
      const response = await fetch(`${server}/api/datas/cases/case/update/${newCase._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCase),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du case");
        }

        const data = await response.json();
    } catch (error) {
        console.error("Erreur:", error.message);
    }
  };
  const updateCoef = async (newCoef) => {
    try {
      console.log(newCoef)
      const response = await fetch(`${server}/api/datas/cases/coef/update/${newCoef._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCoef),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du case");
        }

        const data = await response.json();
    } catch (error) {
        console.error("Erreur:", error.message);
    }
};




  const addCoef = async (newCoef) => {
    try {
      console.log(newCoef)
      const response = await fetch(`${server}/api/datas/cases/coef/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCoef),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du case");
        }

        const data = await response.json();
    } catch (error) {
        console.error("Erreur:", error.message);
    }
};


  


    // Fonction pour créer une nouvelle activité
    const createActivity = async (newActivity) => {
        //console.log(newActivity)
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
            console.log(data)
            return data.data;
        } catch (err) {
            console.log('An error occured', err)
            return false
        } finally {
            
        }
    };


    const createMinActivity = async (newActivity) => {
        console.log(newActivity)
        try {

           const response = await fetch(`${server}/api/datas/activities/minActivity/create`, {
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
            console.log(data)
            return data.data;
        } catch (err) {
            console.log('An error occured', err)
            return false
        } finally {
            
        }
    };


    const createMinPoint = async (newActivity) => {
        console.log(newActivity)
        try {

           const response = await fetch(`${server}/api/datas/activities/minPoint/create`, {
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
            console.log(data)
            return data.data;
        } catch (err) {
            console.log('An error occured', err)
            return false
        } finally {
            
        }
    };


      
      const updateActivity = async (updatedActivity) => {
        try {

          const response = await fetch(`${server}/api/datas/activities/activity/update/${updatedActivity._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedActivity),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update activity');
          }
      
          const data = await response.json();
          
          /*
          // Mettre à jour l'activité localement si l'API réussit
          setActivities((prevActivities) =>
            prevActivities.map((activity) =>
              activity._id === updatedActivity._id ? updatedActivity : activity
            )
          );*/
          setIsActivitiesLoading(true)
        } catch (error) {
          console.error('Error updating activity:', error);
        }
      };
      


      const deleteActivity = async (activityId) => {
        try {
          const response = await fetch(`${server}/api/datas/activities/activity/delete/${activityId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete activity');
          }
      
          const data = await response.json();
          console.log('Activity deleted successfully:', data);
      
          /*
            // Mettre à jour localement la liste des activités après la suppression
            setActivities((prevActivities) =>
                prevActivities.filter((activity) => activity._id !== activityId)
            );
          */
          
          setIsActivitiesLoading(true); // Si vous avez un état de chargement des activités
        } catch (error) {
          console.error('Error deleting activity:', error);
        }
      };
      


    
      // Fonction pour créer une nouvelle activité
    const createForm = async (newForm) => {
      //console.log(newActivity)
      try {

         const response = await fetch(`${server}/api/datas/forms/create`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(newForm),
          });

          const data = await response.json();
          if (response.ok) {
              //setActivities((prev) => [...prev, data]); // Mise à jour locale
          } else {
              throw new Error(data.message || "Erreur lors de la création du form");
          }
          console.log(data)
          return data.data;
      } catch (err) {
          console.log('An error occured', err)
          return false
      } finally {
          
      }
   };

   const updateForm = async (updatedForm) => {
    try {

      const response = await fetch(`${server}/api/datas/forms/update/${updatedForm._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedForm),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update activity');
      }
  
      const data = await response.json();
      
      /*
      // Mettre à jour l'activité localement si l'API réussit
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity._id === updatedActivity._id ? updatedActivity : activity
        )
      );*/
      //setIsActivitiesLoading(true)
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };
  


  const deleteForm = async (formId) => {
    try {
      const response = await fetch(`${server}/api/datas/forms/delete/${formId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete activity');
      }
  
      const data = await response.json();
      console.log('Activity deleted successfully:', data);
  
      /*
        // Mettre à jour localement la liste des activités après la suppression
        setActivities((prevActivities) =>
            prevActivities.filter((activity) => activity._id !== activityId)
        );
      */
      
      //setIsActivitiesLoading(true); // Si vous avez un état de chargement des activités
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };
  





    const stateVars = {user, activities,  cases,}
    const stateFunctions = {}
    const utilFunctions = {createActivity, createMinActivity, createMinPoint, deleteActivity, updateActivity, 
       addCase, addCoef, updateCoef, updateCase, deleteCase, deleteCoef,
       deleteForm, updateForm, createForm
    }


  return (
    <ManagerContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </ManagerContext.Provider>
  );
};
