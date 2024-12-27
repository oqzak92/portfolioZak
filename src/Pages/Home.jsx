// src/composant/Home.jsx
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setData(['Produit 1', 'Produit 2', 'Produit 3']);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-screen"><l-quantum size="45" speed="1.75" color="black"></l-quantum></div>;
  }

  return (
    <div style={{ padding: '20px', color: '#fff', backgroundColor: '#000' }}>
      <h1>Accueil</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

