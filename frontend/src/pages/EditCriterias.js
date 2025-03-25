import React, { useContext, useState } from 'react';
import ActivityForm from '../components/criteriasForms/ActivityForm';
import MinActivityForm from '../components/criteriasForms/MinActivityForm';
import PointActivityForm from '../components/criteriasForms/PointActivityForm';

//import { facultyDepartments } from "../datas/schoolDepartments";
import { positions, titles } from "../datas/schoolDepartments";
import { ManagerContext } from '../context/ManagerContext';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading';
import UserMenu from './UserMenu';


const EditCriterias = () => {

    const { createActivity, createMinActivity, createMinPoint } = useContext(ManagerContext)
    const {user, isAuthenticated, facultyDepartments, isUserLoading, isFacultyLoading, facultyGroups} = useContext(UserContext)

  const [selectedFaculties, setSelectedFaculties] = useState([]); // État pour la faculté sélectionnée
    const [selectedFaculty, setSelectedFaculty] = useState(''); // État pour la faculté sélectionnée

    const [positions, setPositions] = useState([]); 
    const [groups, setGroups] = useState([]); 
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
      if (positionData.position && (positionData.quantity || (positionData.minPoint && positionData.maxPoint))) {
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


    const handleAddGroup = () => {
      if(positions.length > 0) {
        //console.log(positions)
        setGroups(prev => [...prev, 
            { 
              faculty : selectedFaculty,
              positions,
            }
        ]);
        setPositions([])
      }else{
        alert('All the fileds are required before adding a position.')
      }
    };


  
    const handleDeleteFaculty = (index) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this faculty?");
      if (confirmDelete) {
        const updatedFaculties = selectedFaculties.filter((_, i) => i !== index); // Supprimer la faculté par index
        setSelectedFaculties(updatedFaculties); // Met à jour l'état avec la nouvelle liste
      }
    };

    const handleDeletePosition = (index) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this position?");
      if (confirmDelete) {
        const updatedPos = positions.filter((_, i) => i !== index); // Supprimer la faculté par index
        setPositions(updatedPos); // Met à jour l'état avec la nouvelle liste
      }
    };

    const handleDeleteGroup = (index) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this group ?");
      if (confirmDelete) {
        const updatedGroup = groups.filter((_, i) => i !== index); // Supprimer la faculté par index
        setGroups(updatedGroup); // Met à jour l'état avec la nouvelle liste
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
  const [currentForm, setCurrentForm] = useState(1)
  const [selectedActivities, setSelectedActivities] = useState([])
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
        //faculty : facultyDepartments[faculty]._id,
        label,
        department ,
        letter,
        name,
        points,
        number,
        activities:selectedActivities
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
        //setCurrentForm(2);
        return;
    }
    else
    {
        alert('An error occured, try again later')
    }

  };

  const handleSubmitSecondForm = async (event) => {
    event.preventDefault();
    if(groups.length === 0 )
    {
      alert("Veiller choisir au moins une faculté.")
      return;
    }
    //console.log(selectedFaculties)
    //console.log(facultyDepartments)
    //console.log(facultyGroups)
   // const p = positions.map(pos => { return {...pos, position: (titles.find(title => title.value==pos.position))._id }})
    //faculty : pos.faculties.map(g1 => (facultyGroups.find(g2 => g2.name=="Group 1"))._id)

    //console.log(p)



    //console.log(groups)

    
    const activity = {
        //activity : activityId, //"67c7f2ed92f75287d481f2aa",
        letter,
        range,
        from,
        to,
        criteria,
        groups : groups.map(group => ({...group, faculty:(facultyGroups.find(g => g.name==group.faculty))._id, positions:group.positions.map(pos => { return {...pos, position: (titles.find(title => title.value==pos.position))._id }})})),
        position : positionsCount.position,
        quantity : positionsCount.quantity,
        faculty :  selectedFaculties.map(sf => sf._id),
       // positions : p,
        //faculty :  facultyDepartments[positionsCount.faculty]._id,
        //positions : positionsCount,
    }
    //console.log(activity)
  
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
        //setCurrentForm(3);
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
    
    if(groups.length === 0)
    {
      alert("Veiller choisir au moins une faculté.")
      return;
    }

    //
    const activity = {
      //activity : activityId, //"67c7f2ed92f75287d481f2aa",
      letter,
      range,
      from,
      to,
      criteria,
      groups : groups.map(group => ({...group, faculty:(facultyGroups.find(g => g.name==group.faculty))._id, positions:group.positions.map(pos => { return {...pos, position: (titles.find(title => title.value==pos.position))._id }})})),
      
     // positions : p,
      //faculty :  facultyDepartments[positionsCount.faculty]._id,
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
  if(isUserLoading || isFacultyLoading)
  {
    return <Loading/>
  }

  return (
    <div>
            <UserMenu user={user} isAuthenticated={isAuthenticated} />

      <h1>Activity Form</h1>
      

      <div className="d-flex gap-2">
        <button
          className={`btn ${currentForm === 1 ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setCurrentForm(1)}
        >
         New Activity
        </button>
        <button
          className={`btn ${currentForm === 2 ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setCurrentForm(2)}
        >
          Min. Activity
        </button>
        <button
          className={`btn ${currentForm === 3 ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setCurrentForm(3)}
        >
          Points
        </button>
      </div>
  

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
          selectedActivities={selectedActivities} 
          setSelectedActivities={setSelectedActivities}
         
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

            facultyGroups={facultyGroups}
            handleDeletePosition={handleDeletePosition}
            handleAddGroup={handleAddGroup}
            handleDeleteGroup={handleDeleteGroup}
            groups={groups}
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

            facultyGroups={facultyGroups}
            handleDeletePosition={handleDeletePosition}
            handleAddGroup={handleAddGroup}
            handleDeleteGroup={handleDeleteGroup}
            groups={groups}
        />
      )}
    </div>
  );
};

export default EditCriterias;
