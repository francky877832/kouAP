import React, { useCallback, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";
import Loading from '../components/Loading';
import { AdminContext } from '../context/AdminContext';
import { capitalize, formatDate } from '../utils/utilsFunctions';
import ApplicaitonsView from '../components/ApplicationsView';



const AllCandidates = (  isApplicationsLoading, applications_,
  limit1, limit2, handleShow, handleClose, jurorsCount, handleConfirm,
  show, setJurorsCount, error,) => {
  const { state } = useLocation();
  const applications = state?.applications || [];
    const {assignApplicaitonJurys} = useContext(AdminContext)
    const [assignButtonDisabled, setAssignButtonDisabled] = useState(false)
    

  
  if(isApplicationsLoading)
  {
    return <Loading/>
  }
  return (
    <div className="applications-section container mt-4">
        <ApplicaitonsView isApplicationsLoading={isApplicationsLoading}
                applications_={applications}
                limit1={limit1} limit2={limit2} jurorsCount={jurorsCount}
                handleShow={handleShow} handleClose={handleClose} handleConfirm={handleConfirm}
                show={show} setJurorsCount={setJurorsCount} error={error}
            />
    </div>
  );
};


export default AllCandidates;
