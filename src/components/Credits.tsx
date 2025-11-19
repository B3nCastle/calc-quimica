import React from 'react';
import { GraduationCap, Users, UserCircle, Calendar } from 'lucide-react';
import './Credits.css';

const Credits: React.FC = () => {
  return (
    <div className="credits-container">
      <div className="credits-card">
        <div className="credits-header">
          <GraduationCap className="credits-main-icon" size={48} />
          <h1>Créditos</h1>
          <h2>Universidad Mayor</h2>
          <h3>Química Aplicada a la Ingeniería</h3>
        </div>
        
        <div className="credits-content">
          <div className="team-section">
            <h3>
              <Users className="section-icon" size={24} />
              GRUPO 5
            </h3>
            <ul className="team-list">
              <li>BENJAMÍN CASTILLO</li>
              <li>LUKA RAMIREZ</li>
              <li>KIARA POZO</li>
              <li>BRYAN YANSSEN</li>
            </ul>
          </div>
          
          <div className="teacher-section">
            <h3>
              <UserCircle className="section-icon" size={24} />
              Profesora
            </h3>
            <p>Marcela Vivanco Millares</p>
          </div>
          
          <div className="semester-info">
            <Calendar className="section-icon" size={20} />
            <p>Segundo Semestre 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits; 