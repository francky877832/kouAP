import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { JuryContext } from '../context/JuryContext';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading';

// Simulated candidate data
const mockCandidates = [
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
  //const [candidates] = useState(mockCandidates); // Mock candidates data
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Utilisation de 'useNavigate'
  const { fetchJuryApplications } = useContext(JuryContext)
  const {user} = useContext(UserContext)

  const handleSelectCandidate = (candidate) => {
    // Utilisation de 'navigate' pour rediriger vers la page de détails
    navigate('/candidate-details', { state: { candidate } });
  };



  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const data = await fetchJuryApplications(user._id); // Appel de la fonction
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
      <h4 className="text-center mb-4">Select a candidate to review:</h4>

      {/* Display candidates in a table */}
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Degree</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications?.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.fullName}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phoneNumber}</td>
              <td>{candidate.degree}</td>
              <td>{candidate.experience}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSelectCandidate(candidate)}
                >
                  Review
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
