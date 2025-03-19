import React, { createContext, useContext, useEffect, useState } from 'react';

import { server } from '../remote/server';
import { notificaitonsData as notif } from '../utils/utilsNotificationData';
import { UserContext } from './UserContext';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const { user } = useContext(UserContext)
    const [unreadNotif, setUnreadNotif] = useState(0)
    const [isUnreadNotifLoading, setIsUnreadNotifLoading] = useState(true)


  const sendNotifications = async (user, notif) => {
    
    /*user, source, model, type, datas}
    const message = notif[type].message;
    const action = notif[type].action;
    const title = notif[type].title;**/

    const notification = {
      user : user._id,
      source : notif.source,
      //modele: model.toLowerCase(),
      //type: type.toLowerCase(),
      message : notif.message,
      action :notif.action,
      read: 0,
      title : notif.title,
    };

    try {
      const response = await fetch(`${server}/api/datas/notifications/update/${user}`, {
        method: 'PUT',
        body: JSON.stringify(notification),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(await response.text());
      return true;
    } catch (error) {
      console.error('Erreur', error);
      return false;
    }
  };

  const fetchNotifications = async (user, page, limit) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/get/${user._id}?page=${page}&limit=${limit}`);
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur lors de la requête');
      return data.data
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const updateNotificationsRead = async (user, notification) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/update/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId:user._id, notificationId:notification._id}),

      });
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erreur lors de la requête');
      return true;
    } catch (error) {
      console.log(error);
      alert('Erreur', 'Une erreur est survenue! ' + error);
      return false;
    }
  };

  const updateNotification = async (user, newNotification) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/update/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({notificationId:newNotification._id, newNotification:{...newNotification, read:1}}),

      });
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erreur lors de la requête');
      return true;
    } catch (error) {
      console.log(error);
      //alert('Erreur', 'Une erreur est survenue! ' + error);
      return false;
    }
  };

  const getProductFromNotifications = async (id) => {
    try {
      const response = await fetch(`${server}/api/datas/products/get/${id}`);
      if (!response.ok) throw new Error('Erreur lors de la requête');
      return await response.json();
    } catch (error) {
      console.log('Erreur', error);
      return [];
    }
  };

  const deleteNotification = async (user, notification) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId:user._id, notificationId:notification._id,}),

      });
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erreur lors de la requête');
      return true;
    } catch (error) {
      console.log(error);
      //alert('Erreur', 'Une erreur est survenue! ' + error);
      return false;
    }
  };


  const fetchUserUnreadNotificaitons = async (user) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/count/${user._id}`, {
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
      return data.data; 
    } catch (error) {
      console.error("Erreur:", error);
      return 0; 
    }
  }

  
    useEffect(() => {
      const fetchUserNotifCountEffect = async () => {
        setIsUnreadNotifLoading(true)
          const notif = await fetchUserUnreadNotificaitons(user)
          console.log(notif)
          setUnreadNotif(notif)
          setIsUnreadNotifLoading(false)
      };
  
      if(isUnreadNotifLoading)
      {
        fetchUserNotifCountEffect();
      }
     
  }, [isUnreadNotifLoading]);







  const stateVars = {isUnreadNotifLoading, unreadNotif }
    const stateFunctions = { setIsUnreadNotifLoading, setUnreadNotif}
    const utilFunctions = {sendNotifications, fetchNotifications, updateNotificationsRead, updateNotification, getProductFromNotifications,
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
