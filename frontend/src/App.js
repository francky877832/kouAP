import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
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
        <Route path="/candidate-details" element={<CandidateDetails />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/evaluation-details" element={<EvaluationDetails />} />

        <Route path="/login" element={<Login />} />

        
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
