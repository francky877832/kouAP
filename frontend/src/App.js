import React from "react";
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


const App = () => {
  return (
    <Router>
      <Routes>
        
        
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/callback" element={<CallbackLogin />} /> */ }

        <Route path="/system/notifications" element={<Notifications />} />
        <Route path="/view-announcement" element={<ViewAnnouncement />} />
        <Route path="/all-announcements" element={<AllAnnouncements />} />
        <Route path="/apply" element={<MultiStepForm />} />

        <Route path="/users/list" element={<UserList />} />



  {/* Route protégée pour l'admin */}
      <Route path="/admin/add-announcement" element={ <ProtectedRoute element={AnnounceForm} roles={["admin", "dev"]} />} />
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

      {/* tablo 3 */}
        <Route path="/activities/view" element={<Activities />} />
        <Route path="/min-activities/view" element={<MinActivities />} />
        <Route path="/min-points/view" element={<MinPoints />} />



        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/control-user" element={<ControlUser />} />


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
