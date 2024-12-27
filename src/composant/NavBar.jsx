// src/composant/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import logo from '../assets/logo.png';
import cartIcon from "../assets/panier.png";

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobile(!isMobile);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${scrolling ? 'scrolled' : ''}`}>
            <div className="nav-container">
                {/* Menu hamburger (visible uniquement en mobile) */}
                <div className="mobile-left">
                    <div
                        className={`menu-toggle ${isMobile ? 'open' : ''}`}
                        onClick={toggleMobileMenu}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>

                {/* Logo */}
                <div className="logo-container">
                    <img src={logo} alt="Mon Logo" className="logo" />
                </div>

                {/* Navigation principale */}
                <div className="nav-content">
                    <ul className={`nav-list ${isMobile ? 'active' : ''}`}>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/produits" className="nav-link">Projets</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">Compétences</Link>
                        </li>
                                                <li className="nav-item">
                            <Link to="/contact" className="nav-link">À propos</Link>
                        </li>
                    </ul>
                </div>

                {/* Panier (toujours visible) */}
                <div className="cart-container">
                    <Link to="/panier" className="nav-link cart-link">
                        <img src={cartIcon} alt="Panier" className="cart-icon" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;