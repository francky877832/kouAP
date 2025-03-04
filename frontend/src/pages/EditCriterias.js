import React, { useState } from 'react';
import ActivityForm from '../components/criteriasForms/ActivityForm';
import MinActivityForm from '../components/criteriasForms/MinActivityForm';
import PointActivityForm from '../components/criteriasForms/PointActivityForm';

import { facultyDepartments } from "../datas/schoolDepartments";
import { positions } from "../datas/schoolDepartments";

const EditCriterias = () => {
  const [letter, setLetter] = useState('');
  const [name, setName] = useState('');
  const [positionsCount, setPositionsCount] = useState({ position: '', quantity: '' });
  const [positionsPoint, setPositionsPoint] = useState({ position: '', minPoint: '', maxPoint: '', faculty: '' },);
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [range, setRange] = useState(true); // Default is true
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [criteria, setCriteria] = useState('');
  const [currentForm, setCurrentForm] = useState(1); // State to track which form is currently active

  // For generic changes to any property in the positionsPoint object
const handlePositonsCountChange = (event) => {
    const { name, value } = event.target;
    setPositionsCount(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // For handling minPoint and maxPoint specifically
  const handlePositonsPointChange = (event) => {
    const { name, value } = event.target;
    //if (name === 'minPoint' || name === 'maxPoint' || name === 'fsculty') {
      setPositionsPoint(prevState => ({
        ...prevState,
        [name]: value
      }));
    //}
  };
  

  const handleFacultyChange = (e) => {
    setFaculty(e.target.value);
    //setDepartment(""); // Reset department when faculty changes
  };



  const handleSubmitFirstForm = (event) => {
    event.preventDefault();
    setCurrentForm(2); // Switch to second form
  };

  const handleSubmitSecondForm = (event) => {
    event.preventDefault();
    setCurrentForm(3); // Switch to third form
  };

  const handleSubmitThirdForm = (event) => {
    event.preventDefault();
    // Handle third form submission logic here
  };

  return (
    <div>
      <h1>Activity Form</h1>

      {/* First Form */}
      {currentForm === 1 && (
        <ActivityForm
          faculty={faculty}
          setFaculty={setFaculty}
          department={department}
          setDepartment={setDepartment}
          letter={letter}
          setLetter={setLetter}
          name={name}
          setName={setName}
          handleSubmitFirstForm={handleSubmitFirstForm}
        />
      )}

      {/* Second Form */}
      {currentForm === 2 && (
        <MinActivityForm
            range={range}
            setRange={setRange}
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
            criteria={criteria}
            setCriteria={setCriteria}
            facultyDepartments={facultyDepartments}
            faculty={faculty}
            handleSubmitSecondForm={handleSubmitSecondForm}
            positionsCount={positionsCount}
            handlePositonsCountChange={handlePositonsCountChange}
        />
      )}

      {/* Third Form */}
      {currentForm === 3 && (
        <PointActivityForm
            range={range}
            setRange={setRange}
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
            criteria={criteria}
            setCriteria={setCriteria}
            handleSubmitSecondForm={handleSubmitThirdForm}
            positionsPoint={positionsPoint}
            handlePositonsPointChange={handlePositonsPointChange}
            handleFacultyChange = {handleFacultyChange}
            facultyDepartments={facultyDepartments}
            faculty={faculty}
        />
      )}
    </div>
  );
};

export default EditCriterias;
