import React, { useContext, useState } from 'react';
import { JuryContext } from '../context/JuryContext';
import { UserContext } from '../context/UserContext';
import UserMenu from './UserMenu';

const JuryEvaluationForm = ({ application }) => {
  const [personalReport, setPersonalReport] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [submitted, setSubmitted] = useState(false);
    const { user, isAuthenticated } = useContext(UserContext)
  

  const handleReportChange = (e) => {
    setPersonalReport(e.target.value);
  };

  const handleEvaluationChange = (e) => {
    setEvaluation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the data to the backend, but for now, we simulate it
    console.log('Evaluation submitted:', {
      applicationId: application.id,
      personalReport,
      evaluation,
    });
    setSubmitted(true);
  };



  return (
    <div className="jury-evaluation-form">
            <UserMenu user={user} isAuthenticated={isAuthenticated} />

      <h3>Evaluation for {application?.user?.name}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="personalReport">Personal Report</label>
          <textarea
            id="personalReport"
            value={personalReport}
            onChange={handleReportChange}
            rows="5"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="evaluation">Final Evaluation</label>
          <select
            id="evaluation"
            value={evaluation}
            onChange={handleEvaluationChange}
            required
          >
            <option value="">Select Evaluation</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Evaluation
        </button>
      </form>

      {submitted && <p>Evaluation submitted successfully!</p>}
    </div>
  );
};

export default JuryEvaluationForm;
