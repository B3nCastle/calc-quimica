import React from 'react';
import { Link } from 'react-router-dom';
import { UNIT_GROUPS } from '../constants/units';

const Home: React.FC = () => {
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
    <div className="container-fluid py-4">
      {/* Header Principal */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-10">
          <div className="card bg-primary text-white shadow-lg border-0">
            <div className="card-body p-5 text-center">
              <i className="bi bi-calculator display-1 mb-3"></i>
              <h1 className="display-4 fw-bold mb-3">Calculadora del Sistema Internacional (SI)</h1>
              <p className="lead mb-3">
                Convierte fácilmente entre las diferentes unidades del Sistema Internacional de Unidades
              </p>
              <p className="mb-0">
                Esta calculadora está basada en las definiciones oficiales del SI y utiliza factores de 
                conversión exactos. Incluye un teclado integrado para facilitar la entrada de valores 
                numéricos y soporte para notación científica. Abarca las 8 magnitudes físicas fundamentales 
                más utilizadas en ciencia e ingeniería.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Magnitudes - Arreglado para centrar correctamente las 8 medidas */}
      <div className="row justify-content-center mb-5">
        <div className="col-12">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 justify-content-center">
            {Object.entries(UNIT_GROUPS).map(([key, group]) => (
              <div key={key} className="col">
                <Link 
                  to={`/converter/${key}`} 
                  className="text-decoration-none"
                  aria-label={`Ir a conversión de ${group.name.toLowerCase()}`}
                >
                  <div className="card h-100 shadow-sm border-0 hover-card">
                    <div className="card-body d-flex flex-column text-center p-4">
                      <i className={`${magnitudeIcons[key]} display-3 text-primary mb-3`}></i>
                      <h5 className="card-title fw-bold text-dark mb-3">{group.name}</h5>
                      <p className="card-text text-muted flex-grow-1 small">
                        {magnitudeDescriptions[key]}
                      </p>
                      <div className="mt-auto">
                        <span className="badge bg-secondary mb-2">
                          {Object.keys(group.units).length} unidades
                        </span>
                        <div className="d-flex flex-wrap justify-content-center gap-1">
                          {Object.values(group.units).slice(0, 3).map((unit, index) => (
                            <span key={index} className="badge bg-light text-dark border">
                              {unit.symbol}
                            </span>
                          ))}
                          {Object.keys(group.units).length > 3 && (
                            <span className="badge bg-primary">
                              +{Object.keys(group.units).length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-0 text-center">
                      <i className="bi bi-arrow-right text-primary"></i>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Características principales */}
      <div className="row justify-content-center mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4 fw-bold">
            <i className="bi bi-star me-2"></i>
            Características principales
          </h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-bullseye display-4 text-success mb-3"></i>
                  <h5 className="card-title fw-bold">Precisión exacta</h5>
                  <p className="card-text text-muted">
                    Utiliza los factores de conversión oficiales del Sistema Internacional
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-keyboard display-4 text-info mb-3"></i>
                  <h5 className="card-title fw-bold">Teclado integrado</h5>
                  <p className="card-text text-muted">
                    Interfaz táctil con soporte para números, decimales y potencias
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-arrow-left-right display-4 text-warning mb-3"></i>
                  <h5 className="card-title fw-bold">Conversión inteligente</h5>
                  <p className="card-text text-muted">
                    Evita seleccionar la misma unidad en origen y destino automáticamente
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-phone display-4 text-primary mb-3"></i>
                  <h5 className="card-title fw-bold">Diseño responsivo</h5>
                  <p className="card-text text-muted">
                    Funciona perfectamente en dispositivos móviles, tablets y escritorio
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-collection display-4 text-secondary mb-3"></i>
                  <h5 className="card-title fw-bold">8 magnitudes físicas</h5>
                  <p className="card-text text-muted">
                    Cubre longitud, masa, tiempo, volumen, densidad, presión, fuerza y energía
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-info-circle display-4 text-danger mb-3"></i>
                  <h5 className="card-title fw-bold">Información detallada</h5>
                  <p className="card-text text-muted">
                    Muestra la fórmula de conversión, definiciones y aplicaciones prácticas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información del Sistema Internacional */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title fw-bold mb-3">
                <i className="bi bi-book me-2"></i>
                Sobre el Sistema Internacional
              </h2>
              <p className="card-text">
                El Sistema Internacional de Unidades (SI) es el sistema de medidas más ampliamente 
                utilizado en el mundo. Está basado en siete unidades fundamentales que definen 
                todas las demás unidades físicas.
              </p>
              <p className="card-text mb-4">
                Esta calculadora implementa las conversiones para las magnitudes más importantes 
                en ciencia e ingeniería: <strong>longitud, masa, tiempo, volumen, densidad, presión, 
                fuerza y energía</strong>, utilizando las definiciones modernas basadas en constantes 
                físicas fundamentales según los estándares internacionales.
              </p>
              
              <div className="alert alert-info d-flex align-items-center" role="alert">
                <i className="bi bi-lightbulb me-2"></i>
                <div>
                  <strong>Consejo:</strong> Utiliza el teclado integrado para introducir valores. 
                  Puedes usar potencias como x², x³ y xⁿ para cálculos más complejos.
                </div>
              </div>
              
              <div className="alert alert-success d-flex align-items-center" role="alert">
                <i className="bi bi-gear me-2"></i>
                <div>
                  <strong>Aplicaciones:</strong> Ideal para estudiantes, científicos, ingenieros 
                  y cualquier persona que necesite conversiones precisas de unidades.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 