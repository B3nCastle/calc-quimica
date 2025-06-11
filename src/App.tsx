import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import UnitConverter from './components/UnitConverter';
import './App.css';

function App() {
  useEffect(() => {
    // Importar Bootstrap JS dinámicamente
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <Router>
      <div className="App min-vh-100 d-flex flex-column">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            {/* Ruta principal - página de inicio */}
            <Route path="/" element={<Home />} />
            
            {/* Rutas para cada tipo de conversión */}
            <Route path="/converter/:magnitude" element={<UnitConverter />} />
            
            {/* Ruta de fallback para páginas no encontradas */}
            <Route path="*" element={
              <div className="container py-5 text-center">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="card border-danger">
                      <div className="card-body">
                        <i className="bi bi-exclamation-triangle-fill text-danger fs-1 mb-3"></i>
                        <h1 className="card-title text-danger">Página no encontrada</h1>
                        <p className="card-text">
                          La página que buscas no existe. Regresa al inicio para navegar por las conversiones disponibles.
                        </p>
                        <a href="/" className="btn btn-primary">
                          <i className="bi bi-house me-2"></i>
                          Volver al inicio
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        <footer className="bg-dark text-light py-3 mt-auto">
          <div className="container text-center">
            <p className="mb-1 fw-semibold">
              © 2025 Calculadora SI Web - Desarrollada con Vite.js, React y TypeScript
            </p>
            <p className="mb-0 text-muted">
              Basada en las definiciones oficiales del Sistema Internacional de Unidades
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
