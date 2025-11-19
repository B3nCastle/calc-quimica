// @ts-expect-error React is used for JSX
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Search, Home as HomeIcon } from 'lucide-react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ChemistryCalculator from './components/ChemistryCalculator';
import Credits from './components/Credits';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            {/* Ruta principal - página de inicio */}
            <Route path="/" element={<Home />} />
            
            {/* Rutas para cada sección de química */}
            <Route path="/chemistry/:section" element={<ChemistryCalculator />} />
            
            {/* Ruta de créditos */}
            <Route path="/creditos" element={<Credits />} />
            
            {/* Ruta de fallback para páginas no encontradas */}
            <Route path="*" element={
              <div className="not-found">
                <Search className="not-found-icon" size={48} />
                <h1>Página no encontrada</h1>
                <p>La página que buscas no existe. Regresa al inicio para navegar por las calculadoras disponibles.</p>
                <a href="/" className="btn-home">
                  <HomeIcon size={18} />
                  <span>Volver al inicio</span>
                </a>
              </div>
            } />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>
            © 2025 Calculadora de Química - Desarrollada con Vite.js, React y TypeScript
          </p>
          <p>
            Basada en definiciones científicas y valores estándar IUPAC
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
