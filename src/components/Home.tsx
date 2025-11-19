import React from 'react';
import { Link } from 'react-router-dom';
import { Beaker, Sparkles, Scale, PieChart, FlaskConical, Info, Lightbulb, BookOpen, CheckCircle2, ArrowRight, Atom } from 'lucide-react';
import { CHEMISTRY_SECTIONS } from '../constants/chemistry';
import { getIcon } from '../utils/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home-header">
        <div className="header-icon-wrapper">
          <Beaker className="header-main-icon" />
        </div>
        <h1>Calculadora de Química</h1>
        <p className="home-subtitle">
          Calculadora especializada en moles, masa molar, composición porcentual y fórmulas empíricas y moleculares
        </p>
        <p className="home-description">
          Esta calculadora está diseñada para resolver ejercicios de química relacionados con masas y fórmulas empíricas. 
          Incluye información detallada basada en definiciones científicas, fórmulas y ejemplos prácticos. 
          Ideal para estudiantes y profesionales de química que necesitan realizar cálculos precisos.
        </p>
      </div>

      <div className="magnitude-grid">
        {Object.entries(CHEMISTRY_SECTIONS).map(([key, section]) => (
          <Link 
            key={key} 
            to={`/chemistry/${key}`} 
            className="magnitude-card"
            aria-label={`Ir a ${section.name.toLowerCase()}`}
          >
            <div className="card-icon">
              {getIcon(section.icon, { size: 32 })}
            </div>
            <div className="card-content">
              <h3>{section.name}</h3>
              <p className="card-description">
                {section.description}
              </p>
            </div>
            <div className="card-arrow">
              <ArrowRight size={20} />
            </div>
          </Link>
        ))}
      </div>

      <div className="features-section">
        <h2>
          <Sparkles className="section-title-icon" />
          Características principales
        </h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">
              <Beaker size={28} />
            </div>
            <h4>Cálculos de Moles</h4>
            <p>Calcula moles a partir de masa y masa molar con precisión</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <Atom size={28} />
            </div>
            <h4>Número de Avogadro</h4>
            <p>Convierte entre moles y número de partículas (átomos, moléculas)</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <Scale size={28} />
            </div>
            <h4>Masa Molar</h4>
            <p>Calcula la masa molar de cualquier compuesto químico</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <PieChart size={28} />
            </div>
            <h4>Composición Porcentual</h4>
            <p>Determina el porcentaje en masa de cada elemento en un compuesto</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <FlaskConical size={28} />
            </div>
            <h4>Fórmulas Empíricas y Moleculares</h4>
            <p>Calcula fórmulas empíricas y moleculares a partir de composición</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <Info size={28} />
            </div>
            <h4>Información Detallada</h4>
            <p>Incluye definiciones, fórmulas y ejemplos de aplicación</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>
          <BookOpen className="section-title-icon" />
          Sobre los Cálculos Químicos
        </h2>
        <p>
          Esta calculadora cubre los conceptos fundamentales de la química relacionados con masas y fórmulas. 
          Todos los cálculos están basados en las definiciones oficiales del Sistema Internacional de Unidades 
          y utilizan valores estándar de masas atómicas según IUPAC.
        </p>
        <p>
          Las secciones incluidas son: <strong>Moles, Número de Avogadro (átomos y moléculas), Masa Molar, 
          Composición Porcentual y Centesimal, y Fórmulas Empíricas y Moleculares</strong>. 
          Cada sección incluye información teórica, fórmulas y ejemplos prácticos para facilitar el aprendizaje.
        </p>
        <div className="magnitude-summary">
          <h3>
            <CheckCircle2 className="section-title-icon" size={20} />
            Secciones disponibles:
          </h3>
          <div className="magnitude-list">
            {Object.entries(CHEMISTRY_SECTIONS).map(([key, section]) => (
              <div key={key} className="magnitude-item">
                <span className="magnitude-icon">{getIcon(section.icon, { size: 20 })}</span>
                <span className="magnitude-name">{section.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <p>
          <Lightbulb className="footer-icon" size={18} />
          <strong>Consejo:</strong> Utiliza el teclado integrado para introducir valores numéricos. 
          Para fórmulas químicas, escribe los elementos con mayúscula inicial y los números como subíndices (ej: H2O, CO2).
        </p>
        <p>
          <FlaskConical className="footer-icon" size={18} />
          <strong>Ejemplo:</strong> Para calcular la masa molar del etileno (C₂H₄), ingresa "C2H4" en la sección de Masa Molar.
        </p>
      </footer>
    </div>
  );
};

export default Home; 