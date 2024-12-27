import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Text } from '@react-three/drei';
import AnimatedInfoModel from '../composant/AnimatedInfoModel';
import ChatMessage from '../composant/ChatMessage';
import profileImage from '../assets/pro.png';






const models = [
  { url: '/assets/meteorite.glb', scale: 0.1, name: 'CV' },
  { url: '/assets/satelite.glb', scale: 5.8, name: 'à propos de moi' },
  { url: '/assets/astronote.glb', scale: 1.5, name: 'Contact' },
  { url: '/assets/planete.glb', scale: 2.0, name: 'Projets' },
];

const Model = ({ url, scale, name, onFinish }) => {
  const gltf = useLoader(GLTFLoader, url);
  const meshRef = useRef();
  const textRef = useRef();
  const [modelPosition, setModelPosition] = useState(-10); // Position initiale à gauche

  useFrame(() => {
    if (meshRef.current) {
      // Déplacement vers la droite
      meshRef.current.position.x += 0.05;

      // Rotation continue
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;

      // Mise à jour de la position du texte
      if (textRef.current) {
        textRef.current.position.x = meshRef.current.position.x;
        textRef.current.position.y = meshRef.current.position.y + 2;
      }

      // Si le modèle sort complètement du champ de vision
      if (meshRef.current.position.x > 10) { // Augmenter la limite pour quitter complètement la vue
        onFinish();
      }
    }
  });

  return (
    <>
      {/* Texte qui suit le modèle */}
      <Text
        ref={textRef}
        position={[modelPosition, 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        scale={scale}
        position={[modelPosition, 0, 0]}
      />
    </>
  );
};

const Model3DPage = () => {


    const messages = [
      "Initialisation du système de communication... Cliquez sur Suivant pour continuer.",
      ">> Chargement de l'interface utilisateur...",
      ">> Connexion établie.\n\n",
      ">> Bonjour ! Je suis Zakariya BELKASSEM, développeur, étudiant de 21 ans et passionné de développement.",
      ">> Actuellement en seconde année d’informatique à WebTech Institute.",
      ">> Dans cet espace, tu découvriras mon univers à travers mes projets." ,
      ">> Explore mes compétences et vois ce que j’ai déjà réalisé en React, Node.js, et plus encore.",
      ">> N’hésite pas à cliquer et interagir avec les différents modèles pour un aperçu de mon savoir-faire et de mes ambitions.",
      ">> Sur la prochaine page, chaque interaction avec les modeles vous ouvrira une porte vers une nouvelle facette de mon univers.",
      ">> Et pour commencer ce voyage, cliquez sur la soucoupe volante. L’aventure ne fait que commencer !",
      ">> Fin de la transmission.\n\n",
      ">> Merci de ton attention et bonne exploration !"
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isDialogVisible, setIsDialogVisible] = useState(true);

    const handleNextMessage = () => {
        if (currentMessageIndex < messages.length - 1) {
            setCurrentMessageIndex(prev => prev + 1);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogVisible(false);
    };






  const [currentModelIndex, setCurrentModelIndex] = useState(0); // Index du modèle actuel

  // Appelée à la fin du mouvement de chaque modèle pour changer le modèle
  const handleModelFinish = () => {
    setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length); // Passer au modèle suivant, et recommencer si on a atteint la fin
  };

  const { url, scale, name } = models[currentModelIndex]; // Récupérer le modèle actuel en fonction de l'index

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Model url={url} scale={scale} name={name} onFinish={handleModelFinish} />
        <AnimatedInfoModel
          modelPath="/assets/soucoupe.glb"
          initialPosition={{ x: -10, y: 0, z: 0 }}
          targetPosition={{ x: -6, y: 2.5, z: 0 }}
          infoText="Mon Univers"
          targetPage="/home"
        />
      </Canvas>



          {isDialogVisible && (
  <div className="chat-interface">
      <ChatMessage 
          message={messages[currentMessageIndex] || ""}
          profileImage={profileImage}  
          onClose={handleCloseDialog}
      />
      <div className="control-panel">
          {currentMessageIndex < messages.length - 1 ? (
              <button onClick={handleNextMessage} className="control-button next">
                  <span className="button-text">SUIVANT</span>
                  <span className="button-icon">▶</span>
              </button>
          ) : (
              <button onClick={handleCloseDialog} className="control-button exit">
                  <span className="button-text">QUITTER</span>
                  <span className="button-icon">✕</span>
              </button>
          )}
      </div>
  </div>
)}

    </div>
  );
};

export default Model3DPage;
