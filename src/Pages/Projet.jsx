
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './css/Projet.css';
import AnimatedInfoModel from '../composant/AnimatedInfoModel';
import image from '../assets/test.png';
import ChatMessage from '../composant/ChatMessage';
import profileImage from '../assets/pro.png';
import Video1 from '../assets/video1.mp4';
import Vue from '../assets/vue.png';
import Video2 from '../assets/video2.mp4';
import Video3 from '../assets/video3.mp4';
import Fit from '../assets/fit.jpg';

const RotatingModel = ({ position = [0, -1.5, 0], scale = [2, 2, 2] }) => {
    const modelRef = useRef();
    const { scene } = useLoader(GLTFLoader, '/assets/planete.glb');
    
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.01;
        }
    });

    return <primitive ref={modelRef} object={scene} position={position} scale={scale} />;
};

const Projet = () => {
    const initialMessages = [
        { text: "Initialisation du système de communication...", media: null },
        { text: ">> Chargement de l'interface utilisateur...", media: null },
        { text: ">> Connexion établie.\n\n", media: null },
        { text: ">> Salut ! Ici tu pourras voir certain de mes projets.", media: null },
        { text: ">> Si tu souhaites plus d'information, n'hesites pas à demander.", media: null }
    ];

    const [messages, setMessages] = useState(initialMessages); 
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isDialogVisible, setIsDialogVisible] = useState(true);
    const [hasSelectedRepo, setHasSelectedRepo] = useState(false); 
    const [selectedRepo, setSelectedRepo] = useState(null);

    const predefinedMessages = {
        "repo1": [
            { text: "Vous avez cliqué sur le Projet 1. Chargement des informations...", media: null },
            { text: "→ Description : Ce projet est l'un de mes tout premiers réalisés à Dublin. Il s'agit d'un site e-commerce dédié à la vente de packs pour débuter dans le sport. Bien que ce soit une première version, il marque mes débuts dans le développement web.", media: null },
            { text: "→ Remarque : Soyez indulgent, cette version reflète mes premières expériences en programmation.", media: null },
            { text: "→ Technologies utilisées : HTML, CSS, JavaScript.", media: null },
            { text: "→ Fonctionnalités principales : Gestion du panier.", media: null },
            { text: "→ Vidéo de démonstration :", media: { type: 'video', src: Video1, alt: 'Vidéo démonstration' } },
            { text: "→ GitHub :  https://github.com/YounessFTN/FitFull-Box", media: { type: 'link', href: 'https://github.com/votre-lien-repository'} }
        ],
        "repo2": [
            { text: "Vous avez sélectionné le Projet 2. Chargement des informations en cours...", media: null },
            { text: "→ Description : Création d'une application permettant de cartographier les services web. Il s'agissait de mon projet de stage au sein de CIBTP France. Malheureusement, en raison du secret professionnel, je ne peux pas divulguer le code source ni d'autres informations.", media: null },
            { text: "→ Technologies utilisées : Vue.js, YAML, XML.", media: null },
            { text: "→ L'application récupère les données au format YAML et les convertit en XML, ce qui permet de les visualiser sur Draw.io.", media: null }

        ],
        "repo3": [
            { text: "Vous avez sélectionné le Projet 3. Chargement des informations en cours...", media: null },
            { text: "→ Description : Il s'agit d'un site web e-commerce conçu pour la vente de produits officiels liés au FC Barcelone.", media: null },
            { text: "Malheureusement, l'API a été retirée." },
            { text: "→ Technologies utilisées : React, Node.js, JSON Server.", media: null },
            { text: "→ Fonctionnalités principales : paiement en ligne, intégration d'API, gestion du stock et du panier d'achats.", media: null },
            { text: "→ Vidéo de démonstration :", media: { type: 'video', src: Video3, alt: 'Vidéo de démonstration du projet' } },
            { text: "→ GitHub : https://github.com/YounessFTN/FcBarcelona-X-Nike", media: { type: 'link', href: 'https://github.com/votre-lien-repository' } }
        ]
    };

    const handleNextMessage = () => {
        if (currentMessageIndex < messages.length - 1) {
            setCurrentMessageIndex(prev => prev + 1);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogVisible(false);
    };

    const handleRepositoryClick = (repoKey) => {
        const repoMessages = predefinedMessages[repoKey];
        setMessages(repoMessages); 
        setCurrentMessageIndex(0); 
        setIsDialogVisible(true); 
        setHasSelectedRepo(true); 
        setSelectedRepo(repoKey);
    };

    return (
        <div className="Projet-container">
            <Canvas className="Projet-canvas">
                <ambientLight intensity={5.5} />
                <pointLight position={[0, 0, 0]} />
                <RotatingModel />
                <OrbitControls />
                <AnimatedInfoModel
                    modelPath="/assets/soucoupe.glb"
                    initialPosition={{ x: -10, y: 0, z: 0 }}
                    targetPosition={{ x: 0, y: 2.5, z: 0 }}
                    infoText="Retour"
                    targetPage="/home"
                />
            </Canvas>

            {isDialogVisible && (
                <div className="chat-interface">
                    <ChatMessage 
                        message={messages[currentMessageIndex]?.text || ""}
                        media={messages[currentMessageIndex]?.media || null}
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

            <div className="info-projet">
                <h1 className="info-projet-title">Projets</h1>
                <div className="info-projet-line">
                    <img src={Fit} alt="Projet 1" className="projet-image" />
                    <button className="repository-button" onClick={() => handleRepositoryClick('repo1')}>Projet 1</button>
                </div>
                <div className="info-projet-line">
                    <img src={Vue} alt="Projet 2" className="projet-image" />
                    <button className="repository-button" onClick={() => handleRepositoryClick('repo2')}>Projet 2</button>
                </div>
                <div className="info-projet-line">
                    <img src={image} alt="Projet 3" className="projet-image" />
                    <button className="repository-button" onClick={() => handleRepositoryClick('repo3')}>Projet 3</button>
                </div>
            </div>
        </div>
    );
};

export default Projet;

