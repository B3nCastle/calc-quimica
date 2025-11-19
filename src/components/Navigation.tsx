import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Beaker, Home, Users } from 'lucide-react';
import { CHEMISTRY_SECTIONS } from '../constants/chemistry';
import { getIcon } from '../utils/icons';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Beaker className="logo-icon" size={24} />
          <span className="logo-text">Calculadora Química</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <Home size={18} />
            <span>Inicio</span>
          </Link>
          
          {Object.entries(CHEMISTRY_SECTIONS).map(([key, section]) => (
            <Link
              key={key}
              to={`/chemistry/${key}`}
              className={`nav-link ${location.pathname === `/chemistry/${key}` ? 'active' : ''}`}
              title={section.name}
            >
              {getIcon(section.icon, { size: 18 })}
              <span>{section.name}</span>
            </Link>
          ))}

          <Link 
            to="/creditos" 
            className={`nav-link ${location.pathname === '/creditos' ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Créditos</span>
          </Link>
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
              <Home size={18} />
              <span>Inicio</span>
            </Link>
            
            {Object.entries(CHEMISTRY_SECTIONS).map(([key, section]) => (
              <Link
                key={key}
                to={`/chemistry/${key}`}
                className={`nav-mobile-link ${location.pathname === `/chemistry/${key}` ? 'active' : ''}`}
              >
                {getIcon(section.icon, { size: 18 })}
                <span>{section.name}</span>
              </Link>
            ))}

            <Link 
              to="/creditos" 
              className={`nav-mobile-link ${location.pathname === '/creditos' ? 'active' : ''}`}
            >
              <Users size={18} />
              <span>Créditos</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 