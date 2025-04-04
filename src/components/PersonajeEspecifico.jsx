import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './../styles/PersonajeEspecifico.css'; // Crearemos este CSS después

function PersonajeEspecifico() {
    const {id} = useParams();
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://dragonball-api.com/api/characters/${id}`
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
    }, [id]);

    if (cargando) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando personaje...</p>
            </div>
        );
    }
  
    if (error) {
        return (
            <div className="error-container">
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={() => window.location.href = '/'}>Volver al inicio</button>
            </div>
        );
    }

    if (!datos) {
        return (
            <div className="not-found">
                <h2>Personaje no encontrado</h2>
                <p>No se encontró información para este personaje.</p>
            </div>
        );
    }

    return (
        <div className="character-detail-container">
            <div className="character-header">
                <h1 className="character-title">{datos.name}</h1>
                {datos.affiliation && <span className="affiliation-badge">{datos.affiliation}</span>}
            </div>
            
            <div className="character-content">
                <div className="character-image-container">
                    <img 
                        src={datos.image || 'https://via.placeholder.com/400x500?text=Imagen+no+disponible'} 
                        alt={datos.name} 
                        className="character-image"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://via.placeholder.com/400x500?text=Imagen+no+disponible';
                        }}
                    />
                </div>
                
                <div className="character-info">
                    <div className="info-section">
                        <h3>Información Básica</h3>
                        {datos.race && <p><strong>Raza:</strong> {datos.race}</p>}
                        {datos.gender && <p><strong>Género:</strong> {datos.gender}</p>}
                        {datos.ki && <p><strong>Poder de pelea:</strong> {datos.ki}</p>}
                        {datos.maxKi && <p><strong>Poder máximo:</strong> {datos.maxKi}</p>}
                    </div>
                    
                    <div className="info-section">
                        <h3>Características</h3>
                        {datos.description && <p className="description">{datos.description}</p>}
                        {datos.originPlanet && <p><strong>Planeta de origen:</strong> {datos.originPlanet.name}</p>}
                    </div>
                    
                    {datos.transformations && datos.transformations.length > 0 && (
                        <div className="info-section">
                            <h3>Transformaciones</h3>
                            <div className="transformations-grid">
                                {datos.transformations.map((transformation, index) => (
                                    <div key={index} className="transformation-card">
                                        <p><strong>{transformation.name}</strong></p>
                                        {transformation.image && (
                                            <img 
                                                src={transformation.image} 
                                                alt={transformation.name}
                                                className="transformation-image"
                                            />
                                        )}
                                        <p>{transformation.ki || 'Nivel de poder desconocido'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="character-actions">
                <button className="back-button" onClick={() => window.history.back()}>
                    Volver atrás
                </button>
            </div>
        </div>
    );
}

export default PersonajeEspecifico;