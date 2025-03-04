import React from "react";
import { useLocation } from "react-router-dom";

const JuryEvaluationDetails = () => {
  const location = useLocation();
  const { evaluation } = location.state || {};

  if (!evaluation) {
    return <p className="text-center text-danger">No evaluation data available</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Evaluation Details</h2>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{evaluation.jurys[0].jury.name}</h5>
          <p className="card-text">
            <strong>Candidate:</strong> {evaluation.user.name}
          </p>

          <p className="card-text">
            <strong>Status:</strong>{" "}
            <span
              className={`badge ${
                evaluation.jurys[0].decision.toLowerCase() === "approved" ? "bg-success" : "bg-danger"
              }`}
            >
              {evaluation.jurys[0].decision}
            </span>
          </p>


          <div className="mb-3">
            <h6>Evaluation Report</h6>
            <a href={evaluation.jurys[0].report} download className="btn btn-outline-primary">
              📄 Download PDF
            </a>
          </div>

          <div className="mb-3">
            <h6>Summary</h6>
            <textarea
              className="form-control"
              rows="4"
              value={evaluation.jurys[0].summary}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuryEvaluationDetails;
