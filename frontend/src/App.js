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

import AllCandidates from "./pages/AllCandidates";
import AllEvaluations from "./pages/AllEvaluations";


const App = () => {
  return (
    <Router>
      <Routes>
        
        
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/callback" element={<CallbackLogin />} />
        <Route path="/admin/add-announcement" element={<AnnounceForm />} />
        <Route path="/view-announcement" element={<ViewAnnouncement />} />
        <Route path="/all-announcements" element={<AllAnnouncements />} />
        <Route path="/apply" element={<MultiStepForm />} />
        <Route path="/jury-panel" element={<JuryPanel />} />
        <Route path="/application-details" element={<CandidateDetails />} />

        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="admin-panel/view-candidates" element={<AllCandidates />} />
        <Route path="admin-panel/view-evaluations" element={<AllEvaluations />} />
        


        <Route path="/jury-evaluation-details" element={<JuryEvaluationDetails />} />
        <Route path="/jury-evaluation-details" element={<JuryEvaluationDetails />} />

{/* tablo 1 */}
        <Route path="/manager/edit-criteria" element={<EditCriterias />} />
{/* tablo 3 */}
        <Route path="/activities/view" element={<Activities />} />
        <Route path="/min-activities/view" element={<MinActivities />} />
        <Route path="/min-points/view" element={<MinPoints />} />

        <Route path="/case-coef/view" element={<CaseCoef />} />
        <Route path="/manager-form/edit-form" element={<FormManager />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/control-user" element={<ControlUser />} />

        
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
