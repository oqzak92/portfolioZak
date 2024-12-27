// src/pages/RotatingModelPage.jsx

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './css/Contact.css'; // Assurez-vous d'importer le fichier CSS
import AnimatedInfoModel from '../composant/AnimatedInfoModel'; // Assurez-vous que le chemin est correct

const RotatingModel = ({ position = [-6, 0, 0] }) => {
  const modelRef = useRef();
  
  // Charger le modèle 3D
  const { scene } = useLoader(GLTFLoader, '/assets/astronote.glb');

  // Animation de rotation du modèle
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Ajustez la vitesse de rotation ici
    }
  });

  // Appliquer la position au modèle
  return <primitive ref={modelRef} object={scene} position={position} />;
};


  // const handleRefresh = () => {
  //   window.location.reload();
  // };


const Contact = () => {
  useEffect(() => {
    // Vérifie combien de fois la page a été rafraîchie
    const refreshCount = localStorage.getItem('refreshCount') || 0;

    // Si le nombre de rafraîchissements est inférieur à 1, rafraîchit la page
    if (refreshCount <  1) {
      localStorage.setItem('refreshCount', Number(refreshCount) + 1); // Incrémente le compteur
      window.location.reload(); // Rafraîchit la page
    }
  }, []); // Le tableau vide signifie que cela ne s'exécute qu'à la première montée du composant

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} />
        <RotatingModel />
        <OrbitControls />
        <AnimatedInfoModel
          modelPath="/assets/soucoupe.glb"
          initialPosition={{ x: -10, y: 0, z: 0 }}
          targetPosition={{ x: -6, y: 2.5, z: 0 }}
          infoText="Retour"
          targetPage="/home"
        />
      </Canvas>
      {/* Texte de contact centré */}
      <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-20%, -50%)', // Utilisez -50% pour centrer parfaitement
          color: 'white',
          textAlign: 'center',
          zIndex: 1, // Assurez-vous que le texte est au-dessus du canevas
          maxWidth: '600px', // Largeur maximum pour le conteneur
          width: '90%', // Prendre 90% de la largeur de l'écran pour les petits écrans
          padding: '20px', // Espace intérieur autour du texte
          borderRadius: '10px', // Coins arrondis pour un look doux
          backgroundColor: 'rgba(0, 0, 0, 0.763)', // Fond légèrement transparent
          boxShadow: '0 4px 10px rgba(0, 167, 44, 0.3)', // Ombre pour un effet de profondeur
      }}>
        <h1 className="contactTitle">- CONTACTEZ MOI -</h1>
        <h2 className="contactSubtitle">Mes Réseaux</h2>
        <p className="contactText">Email : <a href="zakariya.belkassem01700@gmail.com" style={{ color: 'rgba(0, 240, 12, 0.776)' }}>zakariya.belkassem01700@gmail.com</a></p>
        <p className="contactText">LinkedIn : <a href="https://www.linkedin.com/in/zakariya-belkassem-d%C3%A9veloppeur-web/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(0, 240, 12, 0.776)' }}>Zakariya Belkassem</a></p>
        <p className="contactText">Discord : oqzak92</p>
        <p className="contactText">Localisation: 📍Lyon, France</p>
               {/* Bouton de rafraîchissement */}
        {/* <button 
          onClick={handleRefresh} 
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            color: 'white',
            backgroundColor: 'rgba(0, 240, 12, 0.776)',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0, 240, 12, 0.3)',
          }}
        >
          Charger le modèle
        </button> */}
      </div>
    </div>
  );
};

export default Contact;
