// /criteriasForm/ActivityForm.js
import React from 'react';


import { facultyDepartments } from '../../datas/schoolDepartments'; 

const ActivityForm = ({ faculty, setFaculty, department, setDepartment, letter, setLetter, name, setName, handleSubmitFirstForm }) => {
  return (
    <form onSubmit={handleSubmitFirstForm}>
      <div className="mb-3">
        <label className="form-label">Faculty</label>
        <select className="form-select" value={faculty} onChange={(e) => setFaculty(e.target.value)} required>
          <option value="">Select a faculty</option>
          {Object.keys(facultyDepartments).map((fac) => (
            <option key={fac} value={fac}>
              {fac}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Department</label>
        <select
          className="form-select"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          disabled={!faculty}
          required
        >
          <option value="">Select a department</option>
          {faculty &&
            facultyDepartments[faculty].map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="letter">Letter:</label>
        <select
          id="letter"
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          required
        >
          <option value="">Select a letter</option>
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((letterOption) => (
            <option key={letterOption} value={letterOption}>
              {letterOption}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name">Activity Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <button type="submit">Submit First Form</button>
      </div>
    </form>
  );
};

export default ActivityForm;
