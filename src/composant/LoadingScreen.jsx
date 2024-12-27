// src/composant/LoadingScreen.jsx
import React from 'react';
import './css/LoadingScreen.css'; // Importez le fichier CSS ici
import 'ldrs/ring'
import 'ldrs/quantum'

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div style={{ width: '1000px', height: '1000px' }}>
        <l-quantum size="100" speed="2.75" color="white" />
      </div>
    </div>
  );
};



export default LoadingScreen;


