import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UNIT_GROUPS, MAGNITUDE_INFO } from '../constants/units';
import CalculatorKeyboard from './CalculatorKeyboard';

const UnitConverter: React.FC = () => {
  const { magnitude } = useParams<{ magnitude: string }>();
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [result, setResult] = useState<number>(0);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [conversionSteps, setConversionSteps] = useState<string[]>([]);

  // Obtener el grupo de unidades actual
  const unitGroup = magnitude ? UNIT_GROUPS[magnitude] : null;
  const magnitudeInfo = magnitude ? MAGNITUDE_INFO[magnitude] : null;

  // Iconos de Bootstrap para cada magnitud
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

  // Configurar unidades por defecto al cargar
  useEffect(() => {
    if (unitGroup && Object.keys(unitGroup.units).length >= 2) {
      const unitKeys = Object.keys(unitGroup.units);
      setFromUnit(unitKeys[0]);
      setToUnit(unitKeys[1]);
    }
  }, [unitGroup]);

  // Función para intercambiar unidades
  const swapUnits = () => {
    if (fromUnit && toUnit) {
      const tempUnit = fromUnit;
      setFromUnit(toUnit);
      setToUnit(tempUnit);
    }
  };

  // Función para evaluar expresiones matemáticas
  const evaluateExpression = (expression: string): number => {
    try {
      // Limpiar la expresión
      let cleanExpression = expression.replace(/,/g, '');
      
      // Reemplazar notaciones de potencias
      cleanExpression = cleanExpression.replace(/(\d+(?:\.\d+)?)\s*×\s*10\s*\^\s*([+-]?\d+)/g, '$1e$2');
      cleanExpression = cleanExpression.replace(/×/g, '*');
      cleanExpression = cleanExpression.replace(/÷/g, '/');
      
      // Manejo de potencias simples (x², x³, xⁿ)
      cleanExpression = cleanExpression.replace(/(\d+(?:\.\d+)?)\s*²/g, '($1**2)');
      cleanExpression = cleanExpression.replace(/(\d+(?:\.\d+)?)\s*³/g, '($1**3)');
      
      // Solo permitir números, operadores básicos y paréntesis
      if (!/^[0-9+\-*/.()e\s]+$/.test(cleanExpression)) {
        return parseFloat(expression) || 0;
      }
      
      return Function('"use strict"; return (' + cleanExpression + ')')() || 0;
    } catch {
      return parseFloat(expression) || 0;
    }
  };

  // Realizar conversión con pasos detallados
  useEffect(() => {
    if (unitGroup && fromUnit && toUnit && inputValue) {
      const fromUnitData = unitGroup.units[fromUnit];
      const toUnitData = unitGroup.units[toUnit];
      
      if (fromUnitData && toUnitData) {
        const inputNumber = evaluateExpression(inputValue);
        
        // Paso 1: Convertir a unidad base
        const baseValue = inputNumber * fromUnitData.factor;
        
        // Paso 2: Convertir de unidad base a unidad destino
        const finalResult = baseValue / toUnitData.factor;
        
        setResult(finalResult);
        
        // Generar pasos de conversión
        const steps = [
          `Valor inicial: ${inputNumber} ${fromUnitData.symbol}`,
          `Convertir a ${unitGroup.baseUnit}: ${inputNumber} × ${fromUnitData.factor} = ${baseValue} ${unitGroup.baseUnit}`,
          `Convertir a ${toUnitData.symbol}: ${baseValue} ÷ ${toUnitData.factor} = ${finalResult} ${toUnitData.symbol}`
        ];
        
        setConversionSteps(steps);
      }
    }
  }, [inputValue, fromUnit, toUnit, unitGroup]);

  // Función para formatear números
  const formatNumber = (num: number): string => {
    if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-6 && num !== 0)) {
      return num.toExponential(6);
    }
    return num.toLocaleString('es-ES', { maximumFractionDigits: 10 });
  };

  // Obtener opciones disponibles para los selectores
  const getAvailableOptions = (excludeUnit: string) => {
    if (!unitGroup) return [];
    
    return Object.entries(unitGroup.units)
      .filter(([key]) => key !== excludeUnit)
      .map(([key, unit]) => ({
        value: key,
        label: `${unit.name} (${unit.symbol})`
      }));
  };

  // Manejador del teclado
  const handleKeyboardInput = (value: string) => {
    setInputValue(value);
  };

  if (!unitGroup || !magnitudeInfo) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-danger">
              <div className="card-body text-center">
                <i className="bi bi-exclamation-triangle-fill text-danger fs-1 mb-3"></i>
                <h1 className="card-title text-danger">Magnitud no encontrada</h1>
                <p className="card-text">
                  La magnitud "{magnitude}" no está disponible. Revisa que la URL sea correcta.
                </p>
                <Link to="/" className="btn btn-primary">
                  <i className="bi bi-house me-2"></i>
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header de la magnitud */}
      <div className="row justify-content-center mb-4">
        <div className="col-12">
          <div className="card bg-primary text-white shadow border-0">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <i className={`${magnitudeIcons[magnitude!]} fs-1 me-3`}></i>
                  <div>
                    <h1 className="mb-1 fw-bold">Conversión de {unitGroup.name}</h1>
                    <p className="mb-0 opacity-75">
                      Unidad base del SI: {unitGroup.baseUnit}
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <Link to="/" className="btn btn-outline-light">
                    <i className="bi bi-house me-2"></i>
                    Inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Panel principal de conversión */}
        <div className="col-12 col-lg-8">
          <div className="card shadow border-0">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">
                <i className="bi bi-arrow-left-right me-2"></i>
                Convertidor
              </h5>
            </div>
            <div className="card-body p-4">
              {/* Entrada de valor */}
              <div className="mb-4">
                <label htmlFor="inputValue" className="form-label fw-semibold">
                  <i className="bi bi-input-cursor me-2"></i>
                  Valor a convertir
                </label>
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    id="inputValue"
                    className="form-control"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ingresa un valor"
                  />
                  <span className="input-group-text">
                    {fromUnit && unitGroup.units[fromUnit]?.symbol}
                  </span>
                </div>
                <div className="form-text">
                  Puedes usar expresiones matemáticas como: 2+3, 5*10, 1.5×10³
                </div>
              </div>

              {/* Selectores de unidades con botón de intercambio */}
              <div className="row g-3 mb-4">
                <div className="col-md-5">
                  <label htmlFor="fromUnit" className="form-label fw-semibold">
                    <i className="bi bi-arrow-right me-2"></i>
                    Desde
                  </label>
                  <select
                    id="fromUnit"
                    className="form-select form-select-lg"
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                  >
                    <option value="">Selecciona unidad de origen</option>
                    {Object.entries(unitGroup.units).map(([key, unit]) => (
                      <option key={key} value={key} disabled={key === toUnit}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-2 d-flex align-items-end justify-content-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-lg"
                    onClick={swapUnits}
                    disabled={!fromUnit || !toUnit}
                    title="Intercambiar unidades"
                  >
                    <i className="bi bi-arrow-left-right"></i>
                  </button>
                </div>

                <div className="col-md-5">
                  <label htmlFor="toUnit" className="form-label fw-semibold">
                    <i className="bi bi-arrow-left me-2"></i>
                    Hacia
                  </label>
                  <select
                    id="toUnit"
                    className="form-select form-select-lg"
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                  >
                    <option value="">Selecciona unidad de destino</option>
                    {Object.entries(unitGroup.units).map(([key, unit]) => (
                      <option key={key} value={key} disabled={key === fromUnit}>
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Resultado */}
              {fromUnit && toUnit && (
                <div className="alert alert-success border-0 shadow-sm">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h4 className="alert-heading mb-1">
                        <i className="bi bi-check-circle me-2"></i>
                        Resultado
                      </h4>
                      <p className="mb-0 fs-5">
                        <strong>{formatNumber(result)} {unitGroup.units[toUnit]?.symbol}</strong>
                      </p>
                    </div>
                    <div className="col-md-4 text-md-end">
                      <div className="badge bg-primary p-2">
                        Factor: {(unitGroup.units[fromUnit]?.factor! / unitGroup.units[toUnit]?.factor!).toExponential(3)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pasos de conversión */}
              {conversionSteps.length > 0 && (
                <div className="card border-info">
                  <div className="card-header bg-info text-white">
                    <h6 className="mb-0">
                      <i className="bi bi-list-ol me-2"></i>
                      Pasos de conversión
                    </h6>
                  </div>
                  <div className="card-body">
                    <ol className="mb-0">
                      {conversionSteps.map((step, index) => (
                        <li key={index} className="mb-2">
                          <code className="text-dark">{step}</code>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Teclado calculadora */}
          <div className="mt-4">
            <CalculatorKeyboard onInput={handleKeyboardInput} />
          </div>
        </div>

        {/* Panel lateral de información */}
        <div className="col-12 col-lg-4">
          <div className="sticky-top" style={{ top: '100px' }}>
            {/* Información de la magnitud */}
            <div className="card shadow border-0 mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  Información
                </h5>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  {showInfo ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {showInfo && (
                <div className="card-body">
                  <h6 className="fw-bold text-primary">Definición</h6>
                  <p className="small mb-3">{magnitudeInfo.definition}</p>
                  
                  <h6 className="fw-bold text-primary">Unidad base SI</h6>
                  <p className="small mb-3">{magnitudeInfo.baseDefinition}</p>
                  
                  <h6 className="fw-bold text-primary">Aplicaciones</h6>
                  <ul className="small mb-3">
                    {magnitudeInfo.applications.map((app, index) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                  
                  {magnitudeInfo.formula && (
                    <>
                      <h6 className="fw-bold text-primary">Fórmula</h6>
                      <p className="small mb-3">
                        <code>{magnitudeInfo.formula}</code>
                      </p>
                    </>
                  )}
                  
                  <h6 className="fw-bold text-primary">Ejemplos prácticos</h6>
                  <ul className="small mb-0">
                    {magnitudeInfo.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Lista de unidades disponibles */}
            <div className="card shadow border-0">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="bi bi-list me-2"></i>
                  Unidades disponibles ({Object.keys(unitGroup.units).length})
                </h5>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {Object.entries(unitGroup.units).map(([key, unit]) => (
                    <div key={key} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold">{unit.name}</div>
                        <small className="text-muted">Factor: {unit.factor.toExponential(3)}</small>
                      </div>
                      <span className="badge bg-secondary">{unit.symbol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter; 