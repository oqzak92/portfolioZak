// src/composant/AnimatedInfoModel.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const AnimatedInfoModel = ({ modelPath, initialPosition, targetPosition, infoText, targetPage }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const meshRef = useRef();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState(initialPosition);

  // Animation d'entrée
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: Math.min(prev.x + 0.1, targetPosition.x),
        y: Math.min(prev.y + 0.1, targetPosition.y),
        z: Math.min(prev.z + 0.1, targetPosition.z),
      }));
    }, 16);
    return () => clearInterval(interval);
  }, [targetPosition]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        position={[position.x, position.y, position.z]}
        scale={1.5}
        onClick={() => navigate(targetPage)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      {hovered && (
        <Html position={[position.x, position.y + 1, position.z]}>
          <div style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '5px', borderRadius: '5px' }}>
            {infoText}
          </div>
        </Html>
      )}
    </>
  );
};

export default AnimatedInfoModel;
