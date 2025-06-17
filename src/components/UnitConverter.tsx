import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UNIT_GROUPS, convertUnits, MAGNITUDE_INFO } from '../constants/units';
import CalculatorKeyboard from './CalculatorKeyboard';
import './UnitConverter.css';

const UnitConverter: React.FC = () => {
  const { magnitude } = useParams<{ magnitude: string }>();
  const [inputValue, setInputValue] = useState('0');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  // Obtener información de la magnitud actual
  const currentMagnitude = magnitude && UNIT_GROUPS[magnitude] ? UNIT_GROUPS[magnitude] : null;
  const magnitudeInfo = magnitude && MAGNITUDE_INFO[magnitude] ? MAGNITUDE_INFO[magnitude] : null;

  // Inicializar unidades cuando cambia la magnitud
  useEffect(() => {
    if (currentMagnitude) {
      const units = Object.keys(currentMagnitude.units);
      setFromUnit(units[0] || '');
      setToUnit(units[1] || units[0] || '');
      setInputValue('0');
      setResult(0);
    }
  }, [magnitude, currentMagnitude]);

  // Calcular resultado cuando cambian los valores
  useEffect(() => {
    if (currentMagnitude && fromUnit && toUnit && inputValue) {
      // Evaluar expresiones con potencias
      const processedValue = evaluateExpression(inputValue);
      if (!isNaN(processedValue)) {
        const convertedValue = convertUnits(processedValue, fromUnit, toUnit, magnitude!);
        setResult(convertedValue);
      }
    }
  }, [inputValue, fromUnit, toUnit, magnitude, currentMagnitude]);

  // Función para evaluar expresiones matemáticas simples con potencias
  const evaluateExpression = (expression: string): number => {
    try {
      // Reemplazar caracteres especiales de potencias
      let processed = expression
        .replace(/²/g, '^2')
        .replace(/³/g, '^3');
      
      // Evaluar potencias (formato: número^exponente)
      processed = processed.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, (_, base, exp) => {
        return Math.pow(parseFloat(base), parseFloat(exp)).toString();
      });
      
      // Si no hay operaciones, devolver el número directamente
      if (/^\d+\.?\d*$/.test(processed)) {
        return parseFloat(processed);
      }
      
      return parseFloat(processed) || 0;
    } catch {
      return 0;
    }
  };

  // Manejar entrada del teclado
  const handleKeyPress = (key: string) => {
    if (inputValue === '0' && key !== '.') {
      setInputValue(key);
    } else {
      setInputValue(prev => prev + key);
    }
  };

  const handleClear = () => {
    setInputValue('0');
  };

  const handleDelete = () => {
    setInputValue(prev => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  // Manejar cambio de unidades evitando duplicados
  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    if (unit === toUnit) {
      // Si selecciona la misma unidad, cambiar la unidad destino
      const units = Object.keys(currentMagnitude!.units);
      const nextUnit = units.find(u => u !== unit) || units[0];
      setToUnit(nextUnit);
    }
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    if (unit === fromUnit) {
      // Si selecciona la misma unidad, cambiar la unidad origen
      const units = Object.keys(currentMagnitude!.units);
      const nextUnit = units.find(u => u !== unit) || units[0];
      setFromUnit(nextUnit);
    }
  };

  // Formatear el resultado
  const formatResult = (value: number): string => {
    if (value === 0) return '0';
    if (Math.abs(value) >= 1e6 || Math.abs(value) < 1e-6) {
      return value.toExponential(6);
    }
    return value.toPrecision(8).replace(/\.?0+$/, '');
  };

  if (!currentMagnitude) {
    return (
      <div className="unit-converter">
        <div className="error-message">
          <h2>❌ Magnitud no encontrada</h2>
          <p>La magnitud "{magnitude}" no existe. Por favor, selecciona una válida desde el menú.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="unit-converter">
      <div className="converter-header">
        <h1>🔄 Conversión de {currentMagnitude.name}</h1>
        <p>Convierte entre diferentes unidades de {currentMagnitude.name.toLowerCase()}</p>
        {magnitudeInfo && (
          <button 
            className="info-toggle"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? '📚 Ocultar información' : '📚 Ver información detallada'}
          </button>
        )}
      </div>

      {/* Información detallada de la magnitud */}
      {showInfo && magnitudeInfo && (
        <div className="magnitude-info">
          <h3>📖 Definición</h3>
          <p>{magnitudeInfo.definition}</p>
          
          <h3>🔬 Unidad base del SI</h3>
          <p><strong>{currentMagnitude.baseUnit}:</strong> {magnitudeInfo.baseUnitDefinition}</p>
          
          {magnitudeInfo.formula && (
            <>
              <h3>🧮 Fórmula principal</h3>
              <p className="formula">{magnitudeInfo.formula}</p>
            </>
          )}
          
          <h3>🏭 Aplicaciones prácticas</h3>
          <ul className="applications-list">
            {magnitudeInfo.applications.map((app, index) => (
              <li key={index}>{app}</li>
            ))}
          </ul>
          
          <h3>💡 Ejemplos</h3>
          <ul className="examples-list">
            {magnitudeInfo.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="conversion-section">
        <div className="input-section">
          <h3>📝 Valor a convertir</h3>
          <div className="value-display">
            <input 
              type="text" 
              value={inputValue}
              readOnly
              className="value-input"
              placeholder="0"
            />
          </div>
          
          <div className="unit-selector">
            <label>Desde:</label>
            <select 
              value={fromUnit} 
              onChange={(e) => handleFromUnitChange(e.target.value)}
              className="unit-dropdown"
            >
              {Object.entries(currentMagnitude.units).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="conversion-arrow">➡️</div>

        <div className="output-section">
          <h3>✅ Resultado</h3>
          <div className="result-display">
            <div className="result-value">{formatResult(result)}</div>
          </div>
          
          <div className="unit-selector">
            <label>Hacia:</label>
            <select 
              value={toUnit} 
              onChange={(e) => handleToUnitChange(e.target.value)}
              className="unit-dropdown"
            >
              {Object.entries(currentMagnitude.units).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <CalculatorKeyboard 
        onKeyPress={handleKeyPress}
        onClear={handleClear}
        onDelete={handleDelete}
      />

      <div className="conversion-details">
        <h4>🔍 Detalles de la conversión</h4>
        <div className="conversion-formula">
          <p>
            <strong>Operación:</strong> {inputValue} {currentMagnitude.units[fromUnit]?.symbol} 
            × {currentMagnitude.units[fromUnit]?.factor} 
            ÷ {currentMagnitude.units[toUnit]?.factor} 
            = {formatResult(result)} {currentMagnitude.units[toUnit]?.symbol}
          </p>
        </div>
        
        <div className="unit-details">
          <div className="unit-detail">
            <h5>Unidad origen</h5>
            <p><strong>{currentMagnitude.units[fromUnit]?.name}</strong></p>
            <p>Factor: {currentMagnitude.units[fromUnit]?.factor}</p>
          </div>
          
          <div className="unit-detail">
            <h5>Unidad destino</h5>
            <p><strong>{currentMagnitude.units[toUnit]?.name}</strong></p>
            <p>Factor: {currentMagnitude.units[toUnit]?.factor}</p>
          </div>
          
          <div className="unit-detail">
            <h5>Unidad base SI</h5>
            <p><strong>{currentMagnitude.units[currentMagnitude.baseUnit]?.name}</strong></p>
            <p>Símbolo: {currentMagnitude.baseUnit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter; 