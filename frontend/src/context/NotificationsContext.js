import React, { createContext, useContext, useEffect, useState } from 'react';

import { server } from '../remote/server';
import { notificaitonsData as notif } from '../utils/utilsNotificationData';
import { UserContext } from './UserContext';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {

    


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

  const updateNotificationsRead = async ({ user, id }) => {
    try {
      const response = await fetch(`${server}/api/datas/notifications/read/${user}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Erreur lors de la requête');
      return true;
    } catch (error) {
      console.log(error);
      alert('Erreur', 'Une erreur est survenue! ' + error);
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








  const stateVars = { }
    const stateFunctions = { }
    const utilFunctions = {sendNotifications, fetchNotifications, updateNotificationsRead, getProductFromNotifications }

  return (
    <NotificationsContext.Provider value={{ ...stateVars, ...stateFunctions, ...utilFunctions }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationsContext);
};
