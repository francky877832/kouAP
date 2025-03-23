import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ControlUser from "./pages/ControlUser";

import CallbackLogin from "./pages/CallbackLogin";
import AnnounceForm from "./pages/AnnounceForm";
import Home from "./pages/Home";
import ViewAnnouncement from './pages/ViewAnnouncement'
import AllAnnouncements from "./pages/AllAnnouncements";
import MultiStepForm from "./pages/ApplyForm";
import JuryPanel from "./pages/JuryPanel";
import CandidateDetails from "./pages/CandidateDetails";
import AdminPanel from "./pages/AdminPanel";
import EvaluationDetails from "./pages/EvaluationDetails";
import JuryEvaluationDetails from "./pages/JuryEvaluationDetails";
import EditCriterias from "./pages/EditCriterias";
import Activities from "./pages/Activities";
import MinActivities from "./pages/MinActivities";
import MinPoints from "./pages/MinPoints";
import CaseCoef from "./pages/CaseCoef";
import FormManager from "./pages/FormManager";

import ApplicationsView from "./components/ApplicationsView";
import AllCandidates from "./pages/AllCandidates";
import AllEvaluations from "./pages/AllEvaluations";
import EvaluationsView from "./components/EvaluationsView";
import Notifications from "./pages/Notifications";
import ManagerPanel from "./pages/ManagerPanel";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import UserList from "./pages/UserList";
import UserPanel from "./pages/UserPanel";
import UserApplications from "./pages/UserApplications";
import { UserContext } from "./context/UserContext";


const App = () => {

    const {user, setUser,  isAuthenticated, setIsAuthenticated  } = useContext(UserContext); //user, setUser,

    //const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      const load = () => {
        setIsLoading(true)
          
          const token = localStorage.getItem('token');
          const storedUser = localStorage.getItem('user');
          //alert(token)

          if (token && storedUser) {
            alert(token)
            setIsAuthenticated(true); 
            setUser({...JSON.parse(storedUser), token:token})
          } else {
            setIsAuthenticated(false); 
          }
        setIsLoading(false)
      }

      if(isLoading)
      {
        load()
      }

  }, [isLoading]);

  return (
    <Router>
      <Routes>
        
        
    {/* Routes accessible by all user roles */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all-announcements" element={<AllAnnouncements />} />
        <Route path="/view-announcement" element={<ViewAnnouncement />} />
        <Route path="/system/notifications" element={<Notifications />} />


{/* routes accessible only by the applicant */}
        <Route path="/user/apply" element={ <ProtectedRoute element={MultiStepForm} isLoading={isLoading} isAuthenticated={isAuthenticated} user={user} roles={["user", "dev"]} />} />
        <Route path="/user/panel" element={ <ProtectedRoute element={UserPanel} isAuthenticated={isAuthenticated} user={user} roles={["user", "dev"]} />} />
        <Route path="/user/applications" element={ <ProtectedRoute element={UserApplications} isAuthenticated={isAuthenticated} user={user} roles={["user", "dev"]} />} />


  {/* Route protégée pour l'admin */}
      <Route path="/admin/add-announcement" element={ <ProtectedRoute element={AnnounceForm} isAuthenticated={isAuthenticated} user={user} roles={["admin", "dev"]} />} />
      <Route path="/admin/panel" element={ <ProtectedRoute element={AdminPanel } roles={["admim", "dev"]} />} />
      <Route path="/admin-panel" element={ <ProtectedRoute element={AdminPanel} roles={["admin", "dev"]} />} />
      <Route path="admin-panel/view-applications" element={ <ProtectedRoute element={ApplicationsView} roles={["admin", "dev"]} /> } />
      <Route path="admin-panel/view-evaluations" element={ <ProtectedRoute element={EvaluationsView} roles={["admin", "dev"]} /> } />
        

{/*Jury protected */}
      <Route path="/jury/panel" element={<ProtectedRoute element={JuryPanel} roles={["jury", "dev"]} />}  />
      <Route path="/jury-panel" element={<ProtectedRoute element={JuryPanel} roles={["jury", "dev"]} />}  />
      <Route  path="/application-details" element={<ProtectedRoute element={CandidateDetails} roles={["jury", "dev"]} />} />
      <Route path="/jury/evaluation-details" element={<ProtectedRoute element={JuryEvaluationDetails} roles={["jury", "dev"]} />}  />
   

    


{/* Manger protected, manager public */}
      {/* tablo 1 */}
      <Route path="/manager/panel" element={<ProtectedRoute element={ManagerPanel} roles={["manager", "dev"]}/>}  />
      <Route path="/manager/edit-criteria" element={<ProtectedRoute element={EditCriterias} roles={["manager", "dev"]} />}/>
      <Route path="/manager-form/edit-form" element={<ProtectedRoute element={FormManager} roles={["manager", "dev"]} />}  />
      <Route path="/case-coef/view" element={<ProtectedRoute element={CaseCoef} roles={["manager", "dev"]} />}  />
      <Route path="/user/list" element={ <ProtectedRoute element={UserList} roles={["manager", "dev"]} /> } />

      {/* tablo 3, 1, 2 */}
      {/* routes accesseible by every body as read-only but by manager as read and modify */}
        <Route path="/activities/view" element={<Activities />} />
        <Route path="/min-activities/view" element={<MinActivities />} />
        <Route path="/min-points/view" element={<MinPoints />} />



{/* control, login and register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/control-user" element={<ControlUser />} />

{/* error not found */}
        <Route path="/access-denied" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
};

/*
  <Route path="/" element={<HomePage />} />
  <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} /> { }
*/

export default App;
