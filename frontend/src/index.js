import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from "../src/context/UserContext";
import { AdminProvider } from './context/AdminContext';
import { JuryProvider } from './context/JuryContext';
import { ManagerProvider } from './context/ManagerContext';
import { NotificationsProvider } from './context/NotificationsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <UserProvider>
      <NotificationsProvider>

        <AdminProvider>
        <JuryProvider>
          <ManagerProvider>
              <App />
          </ManagerProvider>
          </JuryProvider>
        </AdminProvider>
        </NotificationsProvider>

      </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
