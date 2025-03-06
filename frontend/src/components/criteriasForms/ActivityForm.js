import React from 'react';

const ActivityForm = ({ 
  faculty, setFaculty, 
  department, setDepartment, 
  letter, setLetter, 
  name, setName, 
  handleSubmitFirstForm,
  points, setPoints, 
  label, setLabel, 
  number, setNumber, 
  facultyDepartments
}) => {
  return (
    <form onSubmit={handleSubmitFirstForm} className="container p-4 border rounded shadow-sm">
      <div className="mb-3">
        <label className="form-label">Faculty</label>
        <select className="form-select" value={faculty} onChange={(e) => setFaculty(e.target.value)} required>
          <option value="">Select a faculty</option>
          {Object.keys(facultyDepartments).map((fac) => (
            <option key={facultyDepartments[fac]._id} value={fac}>{fac}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Department</label>
        <select className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)} disabled={!faculty} required>
          <option value="">Select a department</option>
          {faculty && facultyDepartments[faculty].departments.map((dep) => (
            <option key={dep._id} value={dep._id}>{dep.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Letter</label>
        <select className="form-select" id="letter" value={letter} onChange={(e) => setLetter(e.target.value)} required>
          <option value="">Select a letter</option>
          {[...'ABCDEFGHIJKL'].map((letterOption) => (
            <option key={letterOption} value={letterOption}>{letterOption}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Activity Label</label>
        <input type="text" className="form-control" id="label" value={label} onChange={(e) => setLabel(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Number</label>
        <input type="number" className="form-control" name="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Activity Name</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Points</label>
        <input type="number" className="form-control" name="points" value={points} onChange={(e) => setPoints(e.target.value)} required />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit First Form</button>
      </div>
    </form>
  );
};

export default ActivityForm;
