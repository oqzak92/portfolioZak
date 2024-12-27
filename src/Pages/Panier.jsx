import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber'; // Assurez-vous d'importer Canvas


const Panier = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const fetchItems = async () => {
      // Simule un appel API ou un chargement de données
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simule un délai d'attente
      setItems(['Produit 1', 'Produit 2', 'Produit 3']); // Remplacez par vos données réelles
      setLoading(false); // Arrête le chargement une fois les données chargées
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <l-quantum size="45" speed="1.75" color="black"></l-quantum>
      </div>
    ); // Affiche le loader si loading est vrai
  }

  return (
    <div>
      <h1>Votre Panier</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      {/* Ajouter le Canvas ici pour le modèle 3D */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} /> {/* Lumière ambiante */}
        <directionalLight position={[5, 5, 5]} intensity={1} /> {/* Lumière directionnelle */}
        
        <AnimatedInfoModel
          modelPath="/assets/soucoupe.glb"
          initialPosition={{ x: -10, y: 0, z: 0 }}
          targetPosition={{ x: 0, y: 0, z: 0 }}
          infoText="Découvrez plus sur notre univers !"
          targetPage="/"
        />
      </Canvas>
    </div>
  );
};

export default Panier;
