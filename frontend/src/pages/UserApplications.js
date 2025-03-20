import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading';

// Function to simulate fetching applications from the server
const fetchApplications = async () => {
  // Replace with the actual API call
  return [
    {
      _id: '1',
      user: { TCID: '1234567890' },
      announcement: { position: 'Developer' },
      status: 'approved',
      submittedOn: '2025-03-10T12:00:00Z',
      applicationDocument: 'http://example.com/application1.pdf',
    },
    {
      _id: '2',
      user: { TCID: '0987654321' },
      announcement: { position: 'Designer' },
      status: 'pending',
      submittedOn: '2025-03-12T14:30:00Z',
      applicationDocument: 'http://example.com/application2.pdf',
    },
    // Add more sample applications here
  ];
};

const UserApplications = () => {

    const { fetchUserApplications } = useContext(UserContext)

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
        setIsLoading(true)
        const apps = await fetchApplications();
        setApplications(apps);
        setIsLoading(false)
    };
    
    if(isLoading)
    {
        loadApplications();
    }
    
  }, [isLoading]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'processing':
        return <Badge bg="info">Processing</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  if(isLoading)
  {
    return <Loading/>
  }

  return (
    <div className="container my-5">
      <h2>User Applications</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID (TCID)</th>
            <th>Position</th>
            <th>Status</th>
            <th>Submitted On</th>
            <th>Application Document</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td>{application.user.TCID}</td>
              <td>{application.announcement.position}</td>
              <td>{getStatusBadge(application.status)}</td>
              <td>{new Date(application.submittedOn).toLocaleDateString()}</td>
              <td>
                {application.applicationDocument && (
                  <Button
                    variant="link"
                    href={application.applicationDocument}
                    target="_blank"
                  >
                    Download PDF
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserApplications;
