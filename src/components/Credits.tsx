import React from 'react';
import './Credits.css';

const Credits: React.FC = () => {
  return (
    <div className="credits-container">
      <div className="credits-card">
        <div className="credits-header">
          <h1>🎓 Créditos</h1>
          <h2>Universidad Mayor</h2>
          <h3>Química Aplicada a la Ingeniería</h3>
        </div>
        
        <div className="credits-content">
          <div className="team-section">
            <h3>👥 GRUPO 5</h3>
            <ul className="team-list">
              <li>BENJAMÍN CASTILLO</li>
              <li>JAVIER CORNEJO</li>
              <li>JAVIER GARRIDO</li>
              <li>RAFAELLA LARENAS</li>
              <li>AMARO LÓPEZ</li>
            </ul>
          </div>
          
          <div className="teacher-section">
            <h3>👨‍🏫 Profesora</h3>
            <p>Marcela Vivanco Millares</p>
          </div>
          
          <div className="semester-info">
            <p>Primer Semestre 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits; 