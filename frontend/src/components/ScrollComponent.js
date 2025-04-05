import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


const ScrollComponent = ({ children }) => {
  const scrollRef = useRef(null);

  // Fonction pour défiler vers le bas
  const scrollToBottom = () => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  // Fonction pour défiler vers le haut
  const scrollToTop = () => {
    scrollRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Conteneur de contenu défilant */}
      <div
        ref={scrollRef}
        style={{
          overflowY: 'auto',
          maxHeight: '100vh',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
        }}
      >
        {children}
      </div>

      {/* Bouton vers le bas (fixe en haut) */}
      <Button
        variant="light"
        onClick={scrollToBottom}
        style={{
          position: 'fixed',
          top: '10px', // Bouton en haut
          right: '10px',
          opacity: 0.7,
          borderRadius: '50%',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          zIndex: 9999,
        }}
      >
        <i className="bi bi-arrow-down"></i>
      </Button>

      {/* Bouton vers le haut (fixe en bas) */}
      <Button
        variant="light"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '10px', // Bouton en bas
          right: '10px',
          opacity: 0.7,
          borderRadius: '50%',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          zIndex: 9999,
        }}
      >
        <i className="bi bi-arrow-up"></i>
      </Button>
    </div>
  );
};

export default ScrollComponent;
