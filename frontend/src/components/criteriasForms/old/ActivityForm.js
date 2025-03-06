// /criteriasForm/ActivityForm.js
import React from 'react';


//import { facultyDepartments } from '../../datas/schoolDepartments'; 

const ActivityForm = ({ faculty, setFaculty, department, setDepartment, letter, setLetter, name, setName, handleSubmitFirstForm,
  points, setPoints, label, setLabel, number, setNumber, facultyDepartments


 }) => {
  return (
    <form onSubmit={handleSubmitFirstForm}>
      <div className="mb-3">
        <label className="form-label">Faculty</label>
        <select className="form-select" value={faculty} onChange={(e) => setFaculty(e.target.value)} required>
          <option value="">Select a faculty</option>
          {Object.keys(facultyDepartments).map((fac) => (
            <option key={facultyDepartments[fac]._id} value={fac}>
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
            facultyDepartments[faculty].departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.name}
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
        <label htmlFor="label">Activity Label:</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>

       {/* Saisie du Number */}
       <div>
          <label>Number</label>
            <input
              type="number"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
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


      {/* Saisie du maxPoint */}
      <div>
          <label>Points</label>
            <input
              type="number"
              name="points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
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
