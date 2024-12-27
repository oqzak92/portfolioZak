import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';

function Spaceship({ position, onShoot }) {
  const { scene } = useGLTF('/assets/soucoupe.glb');
  const modelRef = useRef();

  useFrame(() => {
    // Gérer les mouvements du vaisseau
    if (modelRef.current) {
      const speed = 0.1;
      if (movement.left) modelRef.current.position.x -= speed;
      if (movement.right) modelRef.current.position.x += speed;
      if (movement.up) modelRef.current.position.y += speed;
      if (movement.down) modelRef.current.position.y -= speed;
    }
  });

  const [movement, setMovement] = useState({
    left: false,
    right: false,
    up: false,
    down: false
  });

  // Gérer les événements clavier pour le mouvement
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') setMovement((prev) => ({ ...prev, left: true }));
    if (event.key === 'ArrowRight') setMovement((prev) => ({ ...prev, right: true }));
    if (event.key === 'ArrowUp') setMovement((prev) => ({ ...prev, up: true }));
    if (event.key === 'ArrowDown') setMovement((prev) => ({ ...prev, down: true }));
    if (event.key === ' ') onShoot(); // Tirer un projectile
  };

  const handleKeyUp = (event) => {
    if (event.key === 'ArrowLeft') setMovement((prev) => ({ ...prev, left: false }));
    if (event.key === 'ArrowRight') setMovement((prev) => ({ ...prev, right: false }));
    if (event.key === 'ArrowUp') setMovement((prev) => ({ ...prev, up: false }));
    if (event.key === 'ArrowDown') setMovement((prev) => ({ ...prev, down: false }));
  };

  // Ajouter les événements clavier
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <primitive ref={modelRef} object={scene} position={position} />
  );
}

function Bullet({ position, velocity, onCollide }) {
  const bulletRef = useRef();

  useFrame(() => {
    if (bulletRef.current) {
      bulletRef.current.position.x += velocity.x;
      bulletRef.current.position.y += velocity.y;
      bulletRef.current.position.z += velocity.z;

      // Si la balle sort de l'écran, on la supprime
      if (bulletRef.current.position.x > 10 || bulletRef.current.position.x < -10) {
        onCollide();
      }
    }
  });

  return (
    <mesh ref={bulletRef} position={position}>
      <sphereGeometry args={[0.1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}

function Enemy({ position, onCollide }) {
  const enemyRef = useRef();
  const [speed] = useState(0.05);

  useFrame(() => {
    if (enemyRef.current) {
      enemyRef.current.position.x -= speed; // Déplacement simple des ennemis
      if (enemyRef.current.position.x < -10) {
        enemyRef.current.position.x = 10; // Réinitialise l'ennemi une fois hors de l'écran
      }
    }
  });

  return (
    <mesh ref={enemyRef} position={position}>
      <sphereGeometry args={[0.5]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
}

function Game() {
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([
    { id: 1, position: [5, 1, 0] },
    { id: 2, position: [7, -2, 0] },
    { id: 3, position: [10, 3, 0] },
  ]);

  const [spaceshipPosition, setSpaceshipPosition] = useState([0, -2, 0]);

  const shootBullet = () => {
    const newBullet = { id: Date.now(), position: [...spaceshipPosition], velocity: { x: 0.1, y: 0, z: 0 } };
    setBullets((prevBullets) => [...prevBullets, newBullet]);
  };

  const handleBulletCollision = (bulletId) => {
    // Supprime la balle après collision
    setBullets((prevBullets) => prevBullets.filter((bullet) => bullet.id !== bulletId));
  };

  const handleEnemyCollision = (enemyId) => {
    // Supprime l'ennemi après collision
    setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy.id !== enemyId));
  };

  return (
    <Canvas>
      {/* Lumière ambiante et directionnelle */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      {/* Contrôles de la caméra */}
      <OrbitControls />

      {/* Caméra */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

      {/* Vaisseau */}
      <Spaceship position={spaceshipPosition} onShoot={shootBullet} />

      {/* Ennemis */}
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} position={enemy.position} onCollide={() => handleEnemyCollision(enemy.id)} />
      ))}

      {/* Projectiles */}
      {bullets.map((bullet) => (
        <Bullet
          key={bullet.id}
          position={bullet.position}
          velocity={bullet.velocity}
          onCollide={() => handleBulletCollision(bullet.id)}
        />
      ))}
    </Canvas>
  );
}

export default Game;
