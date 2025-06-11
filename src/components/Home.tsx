import React from 'react';
import { Link } from 'react-router-dom';
import { UNIT_GROUPS } from '../constants/units';
import './Home.css';

const Home: React.FC = () => {
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

  // Descripciones para cada magnitud
  const magnitudeDescriptions: Record<string, string> = {
    longitud: 'Convierte entre metros, kilómetros, centímetros, yardas, pulgadas y más',
    masa: 'Convierte entre kilogramos, gramos, toneladas, miligramos y microgramos',
    tiempo: 'Convierte entre segundos, minutos, horas y milisegundos',
    volumen: 'Convierte entre metros cúbicos, litros, galones, mililitros y microlitros',
    densidad: 'Convierte entre kg/m³, g/cm³, g/mL, kg/L y otras unidades de densidad',
    presion: 'Convierte entre pascal, atmósferas, mmHg, psi, torr y bar',
    fuerza: 'Convierte entre newton, kilonewton, dina, kilogramo-fuerza y micronewton',
    energia: 'Convierte entre julios, kilojulios, calorías, kilocalorías y vatios-hora'
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>🧮 Calculadora del Sistema Internacional (SI)</h1>
        <p className="home-subtitle">
          Convierte fácilmente entre las diferentes unidades del Sistema Internacional de Unidades
        </p>
        <p className="home-description">
          Esta calculadora está basada en las definiciones oficiales del SI y utiliza factores de 
          conversión exactos. Incluye un teclado integrado para facilitar la entrada de valores 
          numéricos y soporte para notación científica. Abarca las 8 magnitudes físicas fundamentales 
          más utilizadas en ciencia e ingeniería.
        </p>
      </div>

      <div className="magnitude-grid">
        {Object.entries(UNIT_GROUPS).map(([key, group]) => (
          <Link 
            key={key} 
            to={`/converter/${key}`} 
            className="magnitude-card"
            aria-label={`Ir a conversión de ${group.name.toLowerCase()}`}
          >
            <div className="card-icon">
              {magnitudeIcons[key]}
            </div>
            <div className="card-content">
              <h3>{group.name}</h3>
              <p className="card-description">
                {magnitudeDescriptions[key]}
              </p>
              <div className="unit-count">
                {Object.keys(group.units).length} unidades disponibles
              </div>
              <div className="unit-list">
                {Object.values(group.units).slice(0, 3).map((unit, index) => (
                  <span key={index} className="unit-badge">
                    {unit.symbol}
                  </span>
                ))}
                {Object.keys(group.units).length > 3 && (
                  <span className="unit-badge more">
                    +{Object.keys(group.units).length - 3}
                  </span>
                )}
              </div>
            </div>
            <div className="card-arrow">→</div>
          </Link>
        ))}
      </div>

      <div className="features-section">
        <h2>✨ Características principales</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <h4>Precisión exacta</h4>
            <p>Utiliza los factores de conversión oficiales del Sistema Internacional</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔢</div>
            <h4>Teclado integrado</h4>
            <p>Interfaz táctil con soporte para números, decimales y potencias</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔄</div>
            <h4>Conversión inteligente</h4>
            <p>Evita seleccionar la misma unidad en origen y destino automáticamente</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h4>Diseño responsivo</h4>
            <p>Funciona perfectamente en dispositivos móviles, tablets y escritorio</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🧪</div>
            <h4>8 magnitudes físicas</h4>
            <p>Cubre longitud, masa, tiempo, volumen, densidad, presión, fuerza y energía</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">ℹ️</div>
            <h4>Información detallada</h4>
            <p>Muestra la fórmula de conversión, definiciones y aplicaciones prácticas</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>📚 Sobre el Sistema Internacional</h2>
        <p>
          El Sistema Internacional de Unidades (SI) es el sistema de medidas más ampliamente 
          utilizado en el mundo. Está basado en siete unidades fundamentales que definen 
          todas las demás unidades físicas.
        </p>
        <p>
          Esta calculadora implementa las conversiones para las magnitudes más importantes 
          en ciencia e ingeniería: <strong>longitud, masa, tiempo, volumen, densidad, presión, 
          fuerza y energía</strong>, utilizando las definiciones modernas basadas en constantes 
          físicas fundamentales según los estándares internacionales.
        </p>
        <div className="magnitude-summary">
          <h3>📋 Magnitudes incluidas:</h3>
          <div className="magnitude-list">
            {Object.entries(UNIT_GROUPS).map(([key, group]) => (
              <div key={key} className="magnitude-item">
                <span className="magnitude-icon">{magnitudeIcons[key]}</span>
                <span className="magnitude-name">{group.name}</span>
                <span className="magnitude-base">({group.baseUnit})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <p>
          💡 <strong>Consejo:</strong> Utiliza el teclado integrado para introducir valores. 
          Puedes usar potencias como x², x³ y xⁿ para cálculos más complejos.
        </p>
        <p>
          🔬 <strong>Aplicaciones:</strong> Ideal para estudiantes, científicos, ingenieros 
          y cualquier persona que necesite conversiones precisas de unidades.
        </p>
      </footer>
    </div>
  );
};

export default Home; 