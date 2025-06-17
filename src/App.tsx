import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import UnitConverter from './components/UnitConverter';
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
            
            {/* Rutas para cada tipo de conversión */}
            <Route path="/converter/:magnitude" element={<UnitConverter />} />
            
            {/* Ruta de fallback para páginas no encontradas */}
            <Route path="*" element={
              <div className="not-found">
                <h1>🔍 Página no encontrada</h1>
                <p>La página que buscas no existe. Regresa al inicio para navegar por las conversiones disponibles.</p>
                <a href="/" className="btn-home">🏠 Volver al inicio</a>
              </div>
            } />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>
            © 2025 Calculadora SI Web - Desarrollada con Vite.js, React y TypeScript
          </p>
          <p>
            Basada en las definiciones oficiales del Sistema Internacional de Unidades
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
