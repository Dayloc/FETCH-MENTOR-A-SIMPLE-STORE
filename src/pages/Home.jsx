import { useState, useEffect } from "react";
import "./../styles/home.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

export const Home = () => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dragonball-api.com/api/characters?limit=20"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setDatos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  if (cargando) return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <h2>Error</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">Personajes de Dragon Ball</h1>
      <div className="grid">
        {datos && datos.items.map((character) => (
          <div key={character.id} className="card">
            <div className="image-container p-1">
              <img 
                src={character.image || 'https://via.placeholder.com/300x300?text=Imagen+no+disponible'} 
                alt={character.name} 
                className="image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x300?text=Imagen+no+disponible';
                }}
              />
            </div>
            <div className="character-info">
              <h2 className="character-name">{character.name}</h2>
              {character.race && <p className="character-meta">Raza: {character.race}</p>}
              {character.ki && <p className="character-meta">Ki: {character.ki}</p>}
              {character.affiliation && <p className="character-meta">Afiliación: {character.affiliation}</p>}
            </div>
            <div className="text-center mb-1"><Link to={`/personajeEspecifico/${character.id}`}>Detalle</Link> </div>
          </div>
        ))}
      </div>
    </div>
  );
};