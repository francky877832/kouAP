import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { JuryContext } from '../context/JuryContext';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading';
import { capitalize } from '../utils/utilsFunctions';

// Simulated application data
const mockapplications = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    address: "123 Main St",
    degree: "PhD in Computer Science",
    experience: "5 years teaching experience",
    courses: "CS101, CS102",
    thesisSupervision: "Supervised 3 PhD students",
    cv: true,
    publications: "10 published papers",
    languageCertificates: "TOEFL",
    conferences: "Attended 5 conferences",
    positionType: "Full-time",
    citationsProof: "Available",
    researchProjectCertificates: "Completed 3 research projects",
    recommendationLetters: true,
    administrativeExperienceProof: false
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "987-654-3210",
    address: "456 Another St",
    degree: "Master's in Electrical Engineering",
    experience: "3 years in academia",
    courses: "EE201, EE202",
    thesisSupervision: "Supervised 1 Master thesis",
    cv: true,
    publications: "5 published papers",
    languageCertificates: "IELTS",
    conferences: "Attended 3 conferences",
    positionType: "Part-time",
    citationsProof: "Available",
    researchProjectCertificates: "Completed 2 research projects",
    recommendationLetters: true,
    administrativeExperienceProof: true
  }
];

const JuryPanel = () => {
  //const [applications] = useState(mockapplications); // Mock applications data
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Utilisation de 'useNavigate'
  const { fetchJuryApplications } = useContext(JuryContext)
  const {user} = useContext(UserContext)

  const handleSelectapplication = (application) => {
    // Utilisation de 'navigate' pour rediriger vers la page de détails
    navigate('/application-details', { state: { candidate : application } });
  };



  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const data = await fetchJuryApplications(user._id); // Appel de la fonction
        console.log(data)
        setApplications(data); // Stocker les données dans l'état local
      } catch (err) {
        setError(err.message); // Gérer les erreurs
        alert(err.message)
      } finally {
        setIsLoading(false); // Fin du chargement
      }
    };

    if (user._id) {
      fetchApplications(); // Appeler la fonction lorsque le juryId change
    }
  }, [user, fetchJuryApplications]);

  if(isLoading)
  {
    return <Loading/>
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Jury Panel</h2>
      <h4 className="text-center mb-4">Select a application to review:</h4>

      {/* Display applications in a table */}
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>TC ID</th>
            <th>Apply On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications?.map((application) => (
            <tr key={application._id}>
              <td>{application.user.name}</td>
              <td>{application.user.email}</td>
              <td>{application.user.phoneNumber}</td>
              <td>{application.user.tcId}</td>
              <td>{application.submittedOn}</td>
              <td>
                <button
                  className={`btn ${application.status === "pending" ? "btn btn-primary" : (application.status.toLowerCase()==="approved")? "btn-success" : "btn-danger"}`}
                  onClick={() => handleSelectapplication(application)}
                  
                >
                 { application.status=="pending" ? "Review" : capitalize(application.status) }
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JuryPanel;
