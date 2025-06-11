import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UNIT_GROUPS } from '../constants/units';

const Navigation: React.FC = () => {
  const location = useLocation();

  // Iconos de Bootstrap para cada magnitud - estilo formal
  const magnitudeIcons: Record<string, string> = {
    longitud: 'bi-rulers',
    masa: 'bi-scales',
    tiempo: 'bi-clock',
    volumen: 'bi-droplet',
    densidad: 'bi-circle-half',
    presion: 'bi-speedometer2',
    fuerza: 'bi-arrow-up-right',
    energia: 'bi-lightning'
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          <i className="bi bi-calculator me-2"></i>
          SI Calculator
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                <i className="bi bi-house me-1"></i>
                Inicio
              </Link>
            </li>
            
            {Object.entries(UNIT_GROUPS).map(([key, group]) => (
              <li key={key} className="nav-item">
                <Link
                  to={`/converter/${key}`}
                  className={`nav-link ${location.pathname === `/converter/${key}` ? 'active' : ''}`}
                  title={`Conversión de ${group.name}`}
                >
                  <i className={`${magnitudeIcons[key]} me-1`}></i>
                  {group.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 