// src/components/GlobalError.js
import React from 'react';

const GlobalError = ({ error }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>😵 Oups ! An Error Occured</h2>
        <p style={styles.subtitle}>Try to reload the page or contact the website owner. A common source of this issue is the internet connection.</p>
        <pre style={styles.error}>{error?.toString()}</pre>
        <button onClick={handleReload} style={styles.button}>
          🔄 Reload Page
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #dee2e6',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    color: '#dc3545',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#6c757d',
    marginBottom: '1rem',
  },
  error: {
    textAlign: 'left',
    backgroundColor: '#f1f3f5',
    color: '#e03131',
    padding: '1rem',
    borderRadius: '6px',
    overflowX: 'auto',
    maxHeight: '200px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },
  button: {
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default GlobalError;
