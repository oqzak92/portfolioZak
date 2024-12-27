// src/composant/Model3DPage.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useNavigate } from 'react-router-dom';
import './css/AnimatedInfoModel.css'; // Import du fichier CSS
import ChatMessage from '../composant/ChatMessage';
import profileImage from '../assets/pro.png';

// Charger le modèle de la petite météorite avec rotation indépendante
const SmallMeteorite = () => {
  const gltf = useLoader(GLTFLoader, '/assets/meteorite.glb');
  const meshRef = useRef();
  const [scale, setScale] = useState(0.1);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0075;
      meshRef.current.rotation.x += 0.0075;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.35;
      meshRef.current.position.x = Math.cos(state.clock.getElapsedTime() * 0.3) * 1;
      meshRef.current.position.x += 3;
    }
  });

  return (
    <>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        position={[0, 0, 0]}
        scale={scale}
        onClick={() => {
          const link = document.createElement('a');
          link.href = '../../assets/CV.pdf';  // Remplacez par le chemin de votre fichier
          link.download = 'CV Zakariya Belkassem.pdf';        // Spécifiez le nom du fichier lors du téléchargement
          link.click();
        }}
        onPointerOver={() => { setScale(0.12); setHovered(true); }}
        onPointerOut={() => { setScale(0.1); setHovered(false); }}
      />
      {hovered && (
        <Html position={[meshRef.current.position.x, meshRef.current.position.y + 1, meshRef.current.position.z]}>
          <div style={{ color: 'white', fontSize: '18px', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '5px', borderRadius: '5px' }}>
            Télécharger CV
          </div>
        </Html>
      )}
    </>
  );
};

// Charger le modèle de satellite avec rebond et rotation indépendants
const BouncingModel = () => {
  const gltf = useLoader(GLTFLoader, '/assets/satelite.glb');
  const meshRef = useRef();
  const navigate = useNavigate();
  const [scale, setScale] = useState(4.8);
  const [hovered, setHovered] = useState(false);
  let direction = 1;
  let velocity = 0.005;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.003;
      meshRef.current.position.x += velocity * direction;

      if (meshRef.current.position.x > 5 || meshRef.current.position.x < -5) {
        direction *= -1;
      }
    }
  });

  return (
    <>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        scale={scale}
        position={[-6, 0, 0.1]}
        onClick={() => navigate('/about')}
        onPointerOver={() => { setScale(5.1); setHovered(true); }}
        onPointerOut={() => { setScale(4.8); setHovered(false); }}
      />
      {hovered && (
        <Html position={[meshRef.current.position.x, meshRef.current.position.y + 1, meshRef.current.position.z]}>
          <div style={{ color: 'white', fontSize: '18px', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '15px', borderRadius: '5px' }}>
            À propos de moi
          </div>
        </Html>
      )}
    </>
  );
};

// Charger le modèle d'astronaute
const Astronaute = () => {
  const gltf = useLoader(GLTFLoader, '/assets/astronote.glb');
  const meshRef = useRef();
  const navigate = useNavigate();
  const [scale, setScale] = useState(0.5);
  const [hovered, setHovered] = useState(false);
  let direction = 1;
  let velocity = 0.005;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.004;
      meshRef.current.rotation.x += 0.003;
      meshRef.current.position.x += velocity * direction;

      if (meshRef.current.position.x > 4 || meshRef.current.position.x < -2) {
        direction *= 0;
      }
    }
  });

  return (
    <>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        scale={scale}
        position={[-4, 2, 0.5]}
        onClick={() => navigate('/contact')}
        onPointerOver={() => { setScale(1.1); setHovered(true); }}
        onPointerOut={() => { setScale(0.5); setHovered(false); }}
      />
      {hovered && (
        <Html position={[meshRef.current.position.x, meshRef.current.position.y + 1, meshRef.current.position.z]}>
          <div style={{ color: 'white', fontSize: '18px', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '5px', borderRadius: '5px' }}>
            Contact
          </div>
        </Html>
      )}
    </>
  );
};

// Charger un modèle immobile qui tourne uniquement sur lui-même
const StationaryModel = () => {
  const gltf = useLoader(GLTFLoader, '/assets/planete.glb');
  const meshRef = useRef();
  const navigate = useNavigate();
  const [scale, setScale] = useState(4.5);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        scale={scale}
        position={[4, 3, -4]}
        onClick={() => navigate('/projet')}
        onPointerOver={() => { setScale(4.5); setHovered(true); }}
        onPointerOut={() => { setScale(4.5); setHovered(false); }}
      />
      {hovered && (
        <Html position={[meshRef.current.position.x, meshRef.current.position.y + 1, meshRef.current.position.z]}>
          <div style={{ color: 'white', fontSize: '18px', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '5px', borderRadius: '5px' }}>
            Mes Projets
          </div>
        </Html>
      )}
    </>
  );
};


// const AnimatedInfoModelWithText = () => {
//   const gltf = useLoader(GLTFLoader, '/assets/soucoupe.glb');
//   const meshRef = useRef();
//   const navigate = useNavigate();
//   const [visible, setVisible] = useState(true);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += 0.01;
//       meshRef.current.rotation.x = 0; // Orientation droite
//     }
//   });

//   return (
//     <>
//       <primitive
//         ref={meshRef}
//         object={gltf.scene}
//         scale={1.2}
//         position={[0, 0, 3.5]}
//         onClick={() => navigate('/indisponible')}
//       />
//       {visible && (
//         <Html position={[0, 0, 3.5]}>

//         </Html>
//       )}
//     </>
//   );
// };







const Model3DPage = () => {

const messages = [
    ">> Clique sur la météorite pour télécharger mon CV.",
    ">> L'astronaute peut te guider directement vers mes contacts.",
    ">> La planète est une porte ouverte vers mes projets les plus captivants.",
    ">> Quant au satellite, il te dévoilera tout à propos de moi."
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


    






  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <SmallMeteorite />
        <BouncingModel />
        <StationaryModel />
        <Astronaute />
        {/* <AnimatedInfoModel
          modelPath="/assets/soucoupe.glb"
          initialPosition={{ x: -10, y: 0, z: 0 }}
          targetPosition={{ x: -15 , y: 5.5, z: -6 }}
          infoText="Découvrez plus sur notre univers !"
          targetPage="/universe-info"
        /> */}
        {/* <AnimatedInfoModelWithText /> */}

        <OrbitControls />
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
