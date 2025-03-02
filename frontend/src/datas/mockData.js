// mockData.js

// Simuler des annonces
export const mockAnnouncements = [
    {
      _id: '1',
      title: 'Recrutement Développeur Web',
      startDate: '2025-03-01',
      endDate: '2025-04-01',
      requirements: 'Diplôme en informatique, 3 ans d\'expérience.',
      conditions: 'Passionné par la technologie, compétences en React et Node.js.',
    },
    {
      _id: '2',
      title: 'Recrutement Chef de projet',
      startDate: '2025-04-01',
      endDate: '2025-05-01',
      requirements: 'Master en gestion de projet, 5 ans d\'expérience.',
      conditions: 'Leadership, expérience en gestion d\'équipes.',
    },
  ];
  
  // Simuler des candidatures
  export const mockApplications = [
    {
      _id: 'a1',
      candidateName: 'John Doe',
      position: 'Développeur Web',
      announcementId: '1',
      status: 'En attente',
    },
    {
      _id: 'a2',
      candidateName: 'Jane Smith',
      position: 'Chef de projet',
      announcementId: '2',
      status: 'En attente',
    },
  ];
  
  // Simuler des jurys
  export const mockJuries = [
    {
      _id: 'j1',
      name: 'Juriste 1',
    },
    {
      _id: 'j2',
      name: 'Juriste 2',
    },
    {
      _id: 'j3',
      name: 'Juriste 3',
    },
    {
      _id: 'j4',
      name: 'Juriste 4',
    },
    {
      _id: 'j5',
      name: 'Juriste 5',
    },
  ];

  



  export const mockCandidates = [
    {
      _id: "1",
      name: "John Doe",
      juries: [
        {
          id: "101",
          candidateName: "John Doe",
          juryName: "Dr. Smith",
          status: "Accepted",
          reportUrl: "/fake-report1.pdf",
          summary: "The candidate has demonstrated great technical skills and a strong understanding of web development."
        },
        {
          id: "102",
          candidateName: "John Doe",
          juryName: "Prof. Johnson",
          status: "Rejected",
          reportUrl: "/fake-report2.pdf",
          summary: "The candidate's qualifications do not meet the required criteria for this position."
        },
        {
          id: "103",
          candidateName: "John Doe",
          juryName: "Dr. Williams",
          status: "Accepted",
          reportUrl: "/fake-report3.pdf",
          summary: "The candidate shows potential for growth and has strong communication skills."
        },
        {
          id: "104",
          candidateName: "John Doe",
          juryName: "Prof. Miller",
          status: "Rejected",
          reportUrl: "/fake-report4.pdf",
          summary: "The candidate lacks experience in the required areas."
        },
        {
          id: "105",
          candidateName: "John Doe",
          juryName: "Dr. Taylor",
          status: "Accepted",
          reportUrl: "/fake-report5.pdf",
          summary: "The candidate is a good fit for the role with relevant experience and qualifications."
        },
      ],
    },
    {
      _id: "2",
      name: "Jane Smith",
      juries: [
        {
          id: "201",
          candidateName: "Jane Smith",
          juryName: "Dr. Brown",
          status: "Rejected",
          reportUrl: "/fake-report6.pdf",
          summary: "The candidate's profile does not align with the job's requirements."
        },
        {
          id: "202",
          candidateName: "Jane Smith",
          juryName: "Prof. Wilson",
          status: "Accepted",
          reportUrl: "/fake-report7.pdf",
          summary: "The candidate has excellent leadership skills and project management experience."
        },
        {
          id: "203",
          candidateName: "Jane Smith",
          juryName: "Dr. Adams",
          status: "Accepted",
          reportUrl: "/fake-report8.pdf",
          summary: "Strong analytical skills and well-prepared for the position."
        },
        {
          id: "204",
          candidateName: "Jane Smith",
          juryName: "Prof. Clark",
          status: "Rejected",
          reportUrl: "/fake-report9.pdf",
          summary: "Lack of experience in handling complex projects."
        },
        {
          id: "205",
          candidateName: "Jane Smith",
          juryName: "Dr. Lewis",
          status: "Accepted",
          reportUrl: "/fake-report10.pdf",
          summary: "The candidate demonstrates potential for growth and is highly motivated."
        },
      ],
    },
    {
      _id: "3",
      name: "Alice Johnson",
      juries: [
        {
          id: "301",
          candidateName: "Alice Johnson",
          juryName: "Dr. Walker",
          status: "Accepted",
          reportUrl: "/fake-report11.pdf",
          summary: "The candidate shows excellent expertise and an aptitude for solving complex problems."
        },
        {
          id: "302",
          candidateName: "Alice Johnson",
          juryName: "Prof. Hall",
          status: "Rejected",
          reportUrl: "/fake-report12.pdf",
          summary: "The candidate lacks the experience necessary for this position."
        },
        {
          id: "303",
          candidateName: "Alice Johnson",
          juryName: "Dr. Allen",
          status: "Accepted",
          reportUrl: "/fake-report13.pdf",
          summary: "The candidate's background and skills are a great match for the role."
        },
        {
          id: "304",
          candidateName: "Alice Johnson",
          juryName: "Prof. Young",
          status: "Rejected",
          reportUrl: "/fake-report14.pdf",
          summary: "The candidate did not demonstrate the necessary technical skills."
        },
        {
          id: "305",
          candidateName: "Alice Johnson",
          juryName: "Dr. Hernandez",
          status: "Accepted",
          reportUrl: "/fake-report15.pdf",
          summary: "The candidate has strong problem-solving abilities and is a great addition to the team."
        },
      ],
    },
  ];
  
  