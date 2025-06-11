import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UNIT_GROUPS } from '../constants/units';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  // Iconos para cada magnitud
  const magnitudeIcons: Record<string, string> = {
    longitud: '📏',
    masa: '⚖️',
    tiempo: '⏱️',
    volumen: '🧪',
    densidad: '🔬',
    presion: '🌡️',
    fuerza: '💪',
    energia: '⚡'
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🧮</span>
          <span className="logo-text">SI Calculator</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            🏠 Inicio
          </Link>
          
          {Object.entries(UNIT_GROUPS).map(([key, group]) => (
            <Link
              key={key}
              to={`/converter/${key}`}
              className={`nav-link ${location.pathname === `/converter/${key}` ? 'active' : ''}`}
              title={`Conversión de ${group.name}`}
            >
              {magnitudeIcons[key]} {group.name}
            </Link>
          ))}
        </div>

        {/* Menú hamburguesa para móviles */}
        <div className="nav-mobile">
          <input type="checkbox" id="nav-toggle" className="nav-toggle" />
          <label htmlFor="nav-toggle" className="nav-toggle-label">
            <span></span>
            <span></span>
            <span></span>
          </label>
          
          <div className="nav-mobile-menu">
            <Link 
              to="/" 
              className={`nav-mobile-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              🏠 Inicio
            </Link>
            
            {Object.entries(UNIT_GROUPS).map(([key, group]) => (
              <Link
                key={key}
                to={`/converter/${key}`}
                className={`nav-mobile-link ${location.pathname === `/converter/${key}` ? 'active' : ''}`}
              >
                {magnitudeIcons[key]} {group.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 