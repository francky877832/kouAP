import React, { createContext, useContext, useEffect, useState } from 'react';

import { server } from '../remote/server';
import { notificaitonsData as notif } from '../utils/utilsNotificationData';
import { UserContext } from './UserContext';
import { redirectNonAuthenticatedUser } from '../utils/utilsFunctions';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const { user } = useContext(UserContext)
    const [unreadNotif, setUnreadNotif] = useState(0)
    const [isUnreadNotifLoading, setIsUnreadNotifLoading] = useState(true)


  const sendNotifications = async (user_, notif) => {
    
    /*user, source, model, type, datas}
    const message = notif[type].message;
    const action = notif[type].action;
    const title = notif[type].title;**/

    const notification = {
      user : user_._id,
      source : notif.source,
      //modele: model.toLowerCase(),
      //type: type.toLowerCase(),
      message : notif.message,
      action :notif.action,
      read: 0,
      title : notif.title,
    };

    try {
      const response = await fetch(`${server}/api/datas/notifications/update/${user_._id}`, {
        method: 'PUT',
        body: JSON.stringify(notification),
        headers: {  
          "Authorization": `Bearer ${user.token}`,
        'Content-Type': 'application/json' 
      },
      });
      const data = await response.json();
      if (!response.ok) {
        redirectNonAuthenticatedUser(data)
        throw new Error(data.error || 'Erreur lors de la requête');
      }
      return true
    } catch (error) {
      console.error('Erreur', error);
      return false;
    }
  };

  const fetchNotifications = async (user_, page, limit) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/get/${user_._id}?page=${page}&limit=${limit}`, {
        method : 'GET',
        headers : {
          "Authorization": `Bearer ${user.token}`,
        }
      });
      
      const data = await response.json();
      if (!response.ok) {
        redirectNonAuthenticatedUser(data)
        throw new Error(data.error || 'Erreur lors de la requête');
      }
      return data.data
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const updateNotificationsRead = async (user_, notification) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/update/read`, {
        method: 'PUT',
        headers: { 
          "Authorization": `Bearer ${user.token}`,
         'Content-Type': 'application/json'
         },
        body: JSON.stringify({userId:user._id, notificationId:notification._id}),

      });
      const data = await response.json();
      if (!response.ok) {
        redirectNonAuthenticatedUser(data)
        throw new Error(data.error || 'Erreur lors de la requête');
      }
      return true;
    } catch (error) {
      console.log(error);
      alert('Erreur', 'Une erreur est survenue! ' + error);
      return false;
    }
  };

  const updateNotification = async (user_, newNotification) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/update/${user._id}`, {
        method: 'PUT',
        headers: { 
          "Authorization": `Bearer ${user.token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({notificationId:newNotification._id, newNotification:{...newNotification, read:1}}),

      });
      const data = await response.json();
      if (!response.ok) {
        redirectNonAuthenticatedUser(data)
        throw new Error(data.error || 'Erreur lors de la requête');
      }
      return true;
    } catch (error) {
      console.log(error);
      //alert('Erreur', 'Une erreur est survenue! ' + error);
      return false;
    }
  };



  const deleteNotification = async (user_, notification) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/delete`, {
        method: 'DELETE',
        headers: { 
          "Authorization": `Bearer ${user.token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({userId:user._id, notificationId:notification._id,}),

      });
      const data = await response.json();
      if (!response.ok) {
        redirectNonAuthenticatedUser(data)
        throw new Error(data.error || 'Erreur lors de la requête');
      }
      return true;
    } catch (error) {
      console.log(error);
      //alert('Erreur', 'Une erreur est survenue! ' + error);
      return false;
    }
  };


  const fetchUserUnreadNotificaitons = async (user_) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/count/${user._id}`, {
        method: "GET", // Méthode GET pour récupérer les annonces
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
  
      // Récupérer les données au format JSON
      const data = await response.json();
      if (!response.ok) {
        redirectNonAuthenticatedUser(data)
        throw new Error(data.error || 'Erreur lors de la requête');
      }
      return data.data
    } catch (error) {
      console.error("Erreur:", error);
      return false; 
    }
  }

  
    useEffect(() => {
      const fetchUserNotifCountEffect = async () => {
        setIsUnreadNotifLoading(true)
          const notif = await fetchUserUnreadNotificaitons(user)
          //console.log(notif)
          setUnreadNotif(notif)
          setIsUnreadNotifLoading(false)
      };
  
      if(isUnreadNotifLoading && !!user.token)
      {
        fetchUserNotifCountEffect();
      }
     
  }, [user, isUnreadNotifLoading]);







  const stateVars = {isUnreadNotifLoading, unreadNotif }
    const stateFunctions = { setIsUnreadNotifLoading, setUnreadNotif}
    const utilFunctions = {sendNotifications, fetchNotifications, updateNotificationsRead, updateNotification,
      deleteNotification,
     }

  return (
    <NotificationsContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationsContext);
};
