import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div 
      className="container text-center" 
      style={{ 
        marginTop: '100px', 
        color: '#fff', 
        backgroundColor: '#e74c3c', 
        padding: '50px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' 
      }}
    >
      <h1 className="display-1" style={{ fontSize: '120px', fontWeight: 'bold' }}>404</h1>
      <h2 className="display-4" style={{ fontSize: '36px', marginBottom: '20px' }}>
        Oops! Page Not Found
      </h2>
      <p className="lead" style={{ fontSize: '18px', marginBottom: '30px' }}>
        The page you're looking for doesn't exist, or has been moved. 
        Please check the URL or return to the homepage.
      </p>
      <Link 
        to="/" 
        className="btn btn-light btn-lg"
        style={{ 
          backgroundColor: '#fff', 
          color: '#e74c3c', 
          fontWeight: 'bold', 
          padding: '15px 30px', 
          borderRadius: '30px', 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          transition: 'all 0.3s ease' 
        }}
      >
        Go Back to Homepage
      </Link>
    </div>
  );
}

export default NotFound;
