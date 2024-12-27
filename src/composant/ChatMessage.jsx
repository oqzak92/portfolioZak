import React, { useState, useEffect } from 'react';
import './css/ChatMessage.css';

// Fonction pour nettoyer les occurrences de la chaîne de caractères "undefined"
const removeUndefinedString = (value) => {
    if (typeof value === 'string') {
        // Remplacer uniquement "undefined" par une chaîne vide, mais ne pas affecter les espaces
        return value.replace(/\bundefined\b/g, ''); // Utilisation de \b pour respecter les limites des mots
    }
    return value; // Si ce n'est pas une chaîne, retourner la valeur telle quelle
};

const ChatMessage = ({ message = '', media = null, profileImage, typingSpeed = 30, onClose }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    // Appliquer le nettoyage à chaque valeur qui pourrait contenir la chaîne "undefined"
    const safeMessage = removeUndefinedString(message);
    const safeProfileImage = removeUndefinedString(profileImage) || '/default-profile.png';
    const safeMediaSrc = media ? removeUndefinedString(media.src) : null;
    const safeMediaAlt = media && media.alt ? removeUndefinedString(media.alt) : '';

    useEffect(() => {
        setDisplayedText('');  // Réinitialiser le texte à chaque changement
        setIsTyping(true);     // Réinitialiser l'état de la saisie

        if (!safeMessage) return;  // Ne rien faire si le message est vide après nettoyage

        const characters = safeMessage.split('');  // Découper le message en caractères individuels
        let currentIndex = 0;

        // Intervalle pour l'effet de frappe
        const typingInterval = setInterval(() => {
            if (currentIndex < characters.length) {
                // On récupère chaque caractère, nettoyé de "undefined"
                const charToAdd = characters[currentIndex];
                setDisplayedText((prev) => prev + charToAdd);  // Ajouter le caractère au texte affiché
                currentIndex++;
            } else {
                setIsTyping(false);  // Arrêter l'effet de frappe
                clearInterval(typingInterval);  // Arrêter l'intervalle
            }
        }, typingSpeed);

        // Nettoyer l'intervalle lorsque le composant se démonte ou que les props changent
        return () => clearInterval(typingInterval);
    }, [safeMessage, typingSpeed]);

    // Si le message et le média sont absents ou invalides, ne rien afficher
    if (!safeMessage && !safeMediaSrc) return null;

    return (
        <div className="chat-message-container">
            <div className="chat-message">
                <img
                    src={safeProfileImage} // Utiliser l'image nettoyée
                    alt="Profile"
                    className="profile-image"
                />
                <div className="message-content">
                    {media && (
                        media.type === 'image' ? (
                            <img src={safeMediaSrc} alt={safeMediaAlt} className="media-image" />
                        ) : media.type === 'video' ? (
                            <video src={safeMediaSrc} controls className="media-video" />
                        ) : null
                    )}
                    {safeMessage && <p>{displayedText}</p>}
                    {isTyping && <span className="typing-indicator">▋</span>}
                </div>
            </div>
            <button className="close-chat-button" onClick={onClose}>×</button>
        </div>
    );
};

export default ChatMessage;
