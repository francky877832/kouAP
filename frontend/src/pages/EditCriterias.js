import React, { useContext, useState } from 'react';
import ActivityForm from '../components/criteriasForms/ActivityForm';
import MinActivityForm from '../components/criteriasForms/MinActivityForm';
import PointActivityForm from '../components/criteriasForms/PointActivityForm';

//import { facultyDepartments } from "../datas/schoolDepartments";
import { positions, titles } from "../datas/schoolDepartments";
import { ManagerContext } from '../context/ManagerContext';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading';

const EditCriterias = () => {

    const { createActivity, createMinActivity, createMinPoint } = useContext(ManagerContext)
    const {facultyDepartments,  isUserLoading} = useContext(UserContext)

  const [selectedFaculties, setSelectedFaculties] = useState([]); // État pour la faculté sélectionnée
    const [selectedFaculty, setSelectedFaculty] = useState(''); // État pour la faculté sélectionnée

    const [positions, setPositions] = useState([]); 
    const [positionData, setPositionData] = useState({
        position: '',
        quantity: '',
        faculties: [],
        minPoint : '',
        maxPoint:'',
    });
    const handlePositionChange = (e) => {
      setPositionData({ ...positionData, [e.target.name]: e.target.value });
    };
    const handleAddPosition = () => {
      if (positionData.position && (positionData.quantity || (positionData.minPoint && positionData.maxPoint)) && selectedFaculties.length > 0) {
        setPositions([...positions, { ...positionData, faculties: selectedFaculties}]);
        setPositionData({ position: '', quantity: '', faculties: [], minPoint:'', maxPoint:''});
        setSelectedFaculties([]);
      }else{
        alert('All the fileds are required before adding a position.')
      }
    };
    
  
    const handleAddFaculty = () => {
      if (selectedFaculty) {
        // Ajouter la faculté sélectionnée dans le tableau
        setSelectedFaculties([
          ...selectedFaculties,
          selectedFaculty
        ]);
        setSelectedFaculty(''); // Réinitialiser le champ select après ajout
      }
    };
  
    const handleDeleteFaculty = (index) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this faculty?");
      if (confirmDelete) {
        const updatedFaculties = selectedFaculties.filter((_, i) => i !== index); // Supprimer la faculté par index
        setSelectedFaculties(updatedFaculties); // Met à jour l'état avec la nouvelle liste
      }
    };
  
  const [letter, setLetter] = useState('');
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [positionsCount, setPositionsCount] = useState({ position: '', quantity: '', faculty : '' });
  //const [positionsCount, setPositionsCount] = useState([{ position: '', quantity: '', faculty : '' }]);
  const [positionsPoint, setPositionsPoint] = useState({ position: '', minPoint: '', maxPoint: '', faculty: '' },);
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [range, setRange] = useState(true); // Default is true
  const [from, setFrom] = useState('');
  const [points, setPoints] = useState('');
  const [number, setNumber] = useState('');
  const [to, setTo] = useState('');
  const [criteria, setCriteria] = useState('');
  const [currentForm, setCurrentForm] = useState(3)
  // State to track which form is currently active




  // For generic changes to any property in the positionsPoint object
const handlePositonsCountChange = (event) => {
    const { name, value } = event.target;
    //console.log(value)
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


const [activityId, setActivityId] = useState(null)
  const handleSubmitFirstForm = async (event) => {
    event.preventDefault();

    const activity = {
        faculty : facultyDepartments[faculty]._id,
        label,
        department ,
        letter,
        name,
        points,
        number,
    }
    const data = await createActivity(activity)
    if(data)
    {   
        setActivityId(data._id)
        setFaculty('')
        setDepartment('')
        setName('')
        setLetter('')
        setPoints(null)
        setNumber('')
        setCurrentForm(2);
        return;
    }
    else
    {
        alert('An error occured, try again later')
    }

  };

  const handleSubmitSecondForm = async (event) => {
    event.preventDefault();
    if(positions.length === 0 )
    {
      alert("Veiller choisir au moins une faculté.")
      return;
    }
    //console.log(selectedFaculties)
    //console.log(facultyDepartments)
    console.log(positions)
    const activity = {
        //activity : activityId, //"67c7f2ed92f75287d481f2aa",
        letter,
        range,
        from,
        to,
        criteria,
        position : positionsCount.position,
        quantity : positionsCount.quantity,
        faculty :  selectedFaculties.map(sf => facultyDepartments[sf]._id),
        positions : positions.map(pos => { return {...pos, position: (titles.find(title => title.value==pos.position))._id, faculty : pos.faculties.map(fac => facultyDepartments[fac]._id) }}),
        //faculty :  facultyDepartments[positionsCount.faculty]._id,
        //positions : positionsCount,
    }
    const data = await createMinActivity(activity)
    if(data)
    {  
      
        setActivityId(data._id)
        setFaculty('')
        setDepartment('')
        setName('')
        setLetter('')
        setPoints(null)
        setNumber('')
        setCurrentForm(3);
        setPositionsPoint({ position: '', quantity: '', faculty : '' })
        setPositionData({
          position: '',
          quantity: '',
          faculties: [],
          minPoint : '',
          maxPoint:'',
      })
        return;
    }
    else
    {
        alert('An error occured, try again later')
    }

  };

  const handleSubmitThirdForm = async (event) => {
    event.preventDefault();
    
    if(positions.length === 0)
    {
      alert("Veiller choisir au moins une faculté.")
      return;
    }

    //console.log(selectedFaculties)
    //console.log(positions)
    const activity = {
        //activity : activityId, //"67c7f2ed92f75287d481f2aa",
        letter,
        range,
        from,
        to,
        criteria,
        position : positionsPoint.position ,
        minPoint : positionsPoint.minPoint,
        maxPoint : positionsPoint.maxPoint,
        faculty :  selectedFaculties.map(sf => facultyDepartments[sf]._id),
        //positions : positions,
        positions : positions.map(pos => { return {...pos, position: (titles.find(title => title.value==pos.position))._id, faculty : pos.faculties.map(fac => facultyDepartments[fac]._id) }}),

        //facultyDepartments[positionsPoint.faculty]._id,
        //positions : positionsCount,
    }
    const data = await createMinPoint(activity)
    if(data)
    {  

        setFaculty('')
        setDepartment('')
        setName('')
        setLetter('')
        setPoints(null)
        setNumber('')
        setPositionsPoint({ position: '', minPoint: '', maxPoint: '', faculty: '' })
        setCurrentForm(3);
        setPositionData({
          position: '',
          quantity: '',
          faculties: [],
          minPoint : '',
          maxPoint:'',
      })
        return;
    }
    else
    {
        alert('An error occured, try again later')
    }

  };
  if(isUserLoading)
  {
    return <Loading/>
  }

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
          name={name} setName={setName}
          label={label} setLabel={setLabel}
          handleSubmitFirstForm={handleSubmitFirstForm}
          points={points} setPoints={setPoints}
          number={number} setNumber={setNumber}
          facultyDepartments={facultyDepartments}
         
        />
      )}

      {/* Second Form */}
      {currentForm === 2 && (
        <MinActivityForm
            letter={letter}
            setLetter={setLetter}
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
            selectedFaculties={selectedFaculties}
            setSelectedFaculties={setSelectedFaculties}
            handleAddFaculty={handleAddFaculty}
            handleDeleteFaculty={handleDeleteFaculty}
            selectedFaculty={selectedFaculty} setSelectedFaculty={setSelectedFaculty}
            handlePositionChange={handlePositionChange}
            handleAddPosition={handleAddPosition}
            positionData={positionData}
            positions={positions}
        />
      )}

      {/* Third Form */}
      {currentForm === 3 && (
        <PointActivityForm
            letter={letter}
            setLetter={setLetter}
            range={range}
            setRange={setRange}
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
            criteria={criteria}
            setCriteria={setCriteria}
            handleSubmitThirdForm={handleSubmitThirdForm}
            positionsPoint={positionsPoint}
            handlePositonsPointChange={handlePositonsPointChange}
            handleFacultyChange = {handleFacultyChange}
            facultyDepartments={facultyDepartments}
            faculty={faculty}
            selectedFaculties={selectedFaculties}
            setSelectedFaculties={setSelectedFaculties}
            handleAddFaculty={handleAddFaculty}
            handleDeleteFaculty={handleDeleteFaculty}
            selectedFaculty={selectedFaculty} setSelectedFaculty={setSelectedFaculty}
            handlePositionChange={handlePositionChange}
            handleAddPosition={handleAddPosition}
            positionData={positionData}
            positions={positions}
        />
      )}
    </div>
  );
};

export default EditCriterias;
