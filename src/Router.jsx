import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Pages/Home';
import Panier from './Pages/Panier';
import Navbar from './composant/Navbar';
import QuantumLoader from './composant/loadingScreen';
import Model3DPage from './Pages/Model3DPage';
import StarryBackground from './composant/StarryBackground';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Projet from './Pages/Projet';
import Jeu from './Pages/EvasionSpatiale'
import Test from './Pages/CameraAnimation';

const AppRouter = () => {
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowOverlay(false), 500); // Laisser le fondu agir
    }, 500); // Temps d'affichage du loader

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <StarryBackground />
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/home" element={<Model3DPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/produits" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projet" element={<Projet />} />
        <Route path="/jeu" element={<Jeu />} />
      </Routes>
    </>
  );
};

export default AppRouter;
