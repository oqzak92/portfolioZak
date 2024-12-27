// About.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './css/About.css';
import AnimatedInfoModel from '../composant/AnimatedInfoModel';
import ChatMessage from '../composant/ChatMessage';
import profileImage from '../assets/pro.png';

const RotatingModel = ({ position = [-6, 0, 0], scale = [5, 5, 5] }) => {
    const modelRef = useRef();
    const { scene } = useLoader(GLTFLoader, '/assets/satelite.glb');
    
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.01;
        }
    });

    return <primitive ref={modelRef} object={scene} position={position} scale={scale} />;
};

const About = () => {
    const messages = [
    ">> Initialisation du système...",
    ">> Configuration des paramètres utilisateur...",
    ">> Connexion en cours...\n\n",
    ">> Salut, moi c’est Zakariya BELKASSEM !",
    ">> 21 ans, étudiant chez WebTech et passionné par le développement.",
    ">> J’aime ajouter une touche personnelle à mes projets, en créant des interactions uniques pour rendre chaque expérience utilisateur moins ennuyeuse et plus captivante.",
    ">> Mon rêve ? Fonder ma propre boîte de jeux vidéo avec des scénarios dignes des plus grands films de notre décennie.",
    ">> Mes passions ? Les jeux vidéo narratifs et les films, où les histoires prennent vie.",
    ">> Compétences actuelles : SQL, PHP, JS, React, HTML, CSS… Et toujours en quête d’en apprendre plus !",
    ">> Je suis quelqu’un de sociable et j’adore travailler en équipe.",
    ">> Mon rôle en équipe ? Motiver, écouter, et aider les autres à atteindre leur plein potentiel.",
    ">> Pour moi, chaque engagement est un défi à terminer. C’est un principe fondamental que je respecte.",
    ">> J’ai hâte de rencontrer des gens comme toi, qui lis ceci, et d’apprendre énormément, car chaque rencontre nous apporte quelque chose de nouveau.",
    ">> Prêt à explorer mon univers ? Fais défiler et découvre-en plus sur moi et mes projets !\n\n",
    ">> Fin de la transmission.",
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isDialogVisible, setIsDialogVisible] = useState(true);

    const handlePreviousMessage = () => {
        setCurrentMessageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextMessage = () => {
        if (currentMessageIndex < messages.length - 1) {
            setCurrentMessageIndex(prev => prev + 1);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogVisible(false);
    };

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setItems(['Produit 1', 'Produit 2', 'Produit 3']);
            setLoading(false);
        };

        fetchItems();
    }, []);


    return (
        <div className="about-container">
            <Canvas className="about-canvas">
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

            {isDialogVisible && (
                <div className="chat-interface">
                    <ChatMessage 
                        message={messages[currentMessageIndex] || ""}
                        profileImage={profileImage}  
                        onClose={handleCloseDialog}
                    />
                    <div className="control-panel">
                        {currentMessageIndex > 0 && (
                            <button onClick={handlePreviousMessage} className="control-button previous">
                                <span className="button-icon">◀</span>
                                <span className="button-text">PRÉCÉDENT</span>
                            </button>
                        )}

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

export default About;
