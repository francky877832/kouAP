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
import NotFound from './components/NotFound';
import GlobalError from './components/GlobalError';



class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Une erreur a été capturée :", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <GlobalError/>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <GlobalErrorBoundary>
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
    </GlobalErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
