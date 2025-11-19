import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Calculator, Factory, Lightbulb, X, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  CHEMISTRY_SECTIONS, 
  AVOGADRO_NUMBER,
  calculateMolarMass,
  calculatePercentageComposition,
  calculateEmpiricalFormula,
  calculateMolecularFormula,
  parseFormula,
  ATOMIC_MASSES
} from '../constants/chemistry';
import { getIcon } from '../utils/icons';
import CalculatorKeyboard from './CalculatorKeyboard';
import './ChemistryCalculator.css';

const ChemistryCalculator: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const [showInfo, setShowInfo] = useState(false);
  
  // Estados para diferentes cálculos
  const [inputValue1, setInputValue1] = useState('0');
  const [inputValue2, setInputValue2] = useState('0');
  const [inputFormula, setInputFormula] = useState('');
  const [result, setResult] = useState<string | number>(0);
  const [resultDetails, setResultDetails] = useState<string>('');
  
  // Estados específicos para composición porcentual
  const [percentageInputs, setPercentageInputs] = useState<Record<string, string>>({});
  
  // Estados para fórmula empírica/molecular
  const [empiricalFormula, setEmpiricalFormula] = useState('');
  const [molecularMass, setMolecularMass] = useState('');
  const [calculatedMolecular, setCalculatedMolecular] = useState('');

  const currentSection = section && CHEMISTRY_SECTIONS[section] ? CHEMISTRY_SECTIONS[section] : null;

  // Resetear valores al cambiar de sección
  useEffect(() => {
    setInputValue1('0');
    setInputValue2('0');
    setInputFormula('');
    setResult(0);
    setResultDetails('');
    setPercentageInputs({});
    setEmpiricalFormula('');
    setMolecularMass('');
    setCalculatedMolecular('');
  }, [section]);

  // Evaluar expresiones matemáticas
  const evaluateExpression = (expression: string): number => {
    try {
      let processed = expression
        .replace(/²/g, '^2')
        .replace(/³/g, '^3')
        .replace(/×/g, '*')
        .replace(/÷/g, '/');
      
      processed = processed.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, (_match, base, exp) => {
        return Math.pow(parseFloat(base), parseFloat(exp)).toString();
      });
      
      if (/^\d+\.?\d*$/.test(processed)) {
        return parseFloat(processed);
      }
      
      return parseFloat(processed) || 0;
    } catch {
      return 0;
    }
  };

  // Calcular según la sección
  useEffect(() => {
    if (!currentSection) return;

    const val1 = evaluateExpression(inputValue1);
    const val2 = evaluateExpression(inputValue2);

    switch (currentSection.id) {
      case 'moles':
        // n = m / M
        if (val1 > 0 && val2 > 0) {
          const moles = val1 / val2;
          setResult(moles);
          setResultDetails(`${val1} g ÷ ${val2} g/mol = ${moles.toFixed(6)} mol`);
        }
        break;

      case 'avogadro':
        // N = n × NA o n = N / NA
        if (val1 > 0) {
          if (val2 > 0) {
            // Si hay dos valores, asumimos que val1 es número de partículas y val2 es NA
            const moles = val1 / val2;
            setResult(moles);
            setResultDetails(`${val1} partículas ÷ ${val2} mol⁻¹ = ${moles.toFixed(6)} mol`);
          } else {
            // Solo un valor: calcular partículas desde moles
            const particles = val1 * AVOGADRO_NUMBER;
            setResult(particles);
            setResultDetails(`${val1} mol × ${AVOGADRO_NUMBER.toExponential(3)} mol⁻¹ = ${particles.toExponential(3)} partículas`);
          }
        }
        break;

      case 'masaMolar':
        if (inputFormula.trim()) {
          try {
            const molarMass = calculateMolarMass(inputFormula);
            const parsed = parseFormula(inputFormula);
            let details = `Masa molar de ${inputFormula}:\n`;
            const parts: string[] = [];
            for (const [element, count] of Object.entries(parsed.elements)) {
              const atomicMass = ATOMIC_MASSES[element] || 0;
              if (atomicMass > 0) {
                parts.push(`${count} × ${atomicMass.toFixed(3)} (${element})`);
              }
            }
            details += parts.join(' + ') + ` = ${molarMass.toFixed(3)} g/mol`;
            setResult(molarMass);
            setResultDetails(details);
          } catch (error) {
            setResult('Error');
            setResultDetails('Fórmula inválida. Verifica que los elementos estén escritos correctamente (ej: H2O, CO2).');
          }
        }
        break;

      case 'composicionPorcentual':
        if (inputFormula.trim()) {
          try {
            const composition = calculatePercentageComposition(inputFormula);
            const molarMass = calculateMolarMass(inputFormula);
            let details = `Composición porcentual de ${inputFormula} (M = ${molarMass.toFixed(3)} g/mol):\n`;
            for (const [element, percent] of Object.entries(composition)) {
              details += `${element}: ${percent.toFixed(2)}%\n`;
            }
            setResult(composition);
            setResultDetails(details);
          } catch (error) {
            setResult('Error');
            setResultDetails('Fórmula inválida');
          }
        }
        break;

      case 'formulasEmpiricaMolecular':
        // Calcular fórmula empírica desde porcentajes
        if (Object.keys(percentageInputs).length > 0) {
          const percentages: Record<string, number> = {};
          for (const [element, value] of Object.entries(percentageInputs)) {
            const numValue = parseFloat(value);
            if (!isNaN(numValue) && numValue > 0) {
              percentages[element] = numValue;
            }
          }
          if (Object.keys(percentages).length > 0) {
            const empirical = calculateEmpiricalFormula(percentages);
            setEmpiricalFormula(empirical);
            
            // Si hay masa molecular, calcular fórmula molecular
            const molMass = parseFloat(molecularMass);
            if (!isNaN(molMass) && molMass > 0 && empirical) {
              const molecular = calculateMolecularFormula(empirical, molMass);
              setCalculatedMolecular(molecular);
            } else {
              setCalculatedMolecular('');
            }
          } else {
            setEmpiricalFormula('');
            setCalculatedMolecular('');
          }
        } else {
          setEmpiricalFormula('');
          setCalculatedMolecular('');
        }
        break;
    }
  }, [inputValue1, inputValue2, inputFormula, percentageInputs, molecularMass, currentSection]);

  const handleKeyPress = (key: string, inputNumber: 1 | 2 = 1) => {
    const setter = inputNumber === 1 ? setInputValue1 : setInputValue2;
    const currentValue = inputNumber === 1 ? inputValue1 : inputValue2;
    
    if (currentValue === '0' && key !== '.') {
      setter(key);
    } else {
      setter(prev => prev + key);
    }
  };

  const handleClear = (inputNumber: 1 | 2 = 1) => {
    if (inputNumber === 1) {
      setInputValue1('0');
    } else {
      setInputValue2('0');
    }
  };

  const handleDelete = (inputNumber: 1 | 2 = 1) => {
    const currentValue = inputNumber === 1 ? inputValue1 : inputValue2;
    const setter = inputNumber === 1 ? setInputValue1 : setInputValue2;
    
    setter(prev => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const formatResult = (value: string | number | Record<string, number>): string => {
    if (typeof value === 'object') {
      return 'Ver detalles';
    }
    if (typeof value === 'string') return value;
    if (value === 0) return '0';
    if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-6 && value !== 0)) {
      return value.toExponential(6);
    }
    return value.toPrecision(8).replace(/\.?0+$/, '');
  };

  if (!currentSection) {
    return (
      <div className="chemistry-calculator">
        <div className="error-message">
          <X className="error-icon" size={48} />
          <h2>Sección no encontrada</h2>
          <p>La sección "{section}" no existe. Por favor, selecciona una válida desde el menú.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chemistry-calculator">
      <div className="calculator-header">
        <div className="header-title-section">
          <div className="section-icon-wrapper">
            {getIcon(currentSection.icon, { size: 32 })}
          </div>
          <div>
            <h1>{currentSection.name}</h1>
            <p>{currentSection.description}</p>
          </div>
        </div>
        <button 
          className="info-toggle"
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? (
            <>
              <ChevronUp size={18} />
              <span>Ocultar información</span>
            </>
          ) : (
            <>
              <BookOpen size={18} />
              <span>Ver información detallada</span>
            </>
          )}
        </button>
      </div>

      {showInfo && (
        <div className="section-info">
          <h3>
            <BookOpen className="info-section-icon" size={20} />
            Definición
          </h3>
          <p>{currentSection.definition}</p>
          
          <h3>
            <Calculator className="info-section-icon" size={20} />
            Fórmula
          </h3>
          <p className="formula">{currentSection.formula}</p>
          
          <h3>
            <Factory className="info-section-icon" size={20} />
            Aplicaciones
          </h3>
          <ul className="applications-list">
            {currentSection.applications.map((app, index) => (
              <li key={index}>{app}</li>
            ))}
          </ul>
          
          <h3>
            <Lightbulb className="info-section-icon" size={20} />
            Ejemplos
          </h3>
          <ul className="examples-list">
            {currentSection.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="calculation-section">
        {currentSection.id === 'moles' && (
          <>
            <div className="input-group">
              <label>Masa (g):</label>
              <input 
                type="text" 
                value={inputValue1}
                readOnly
                className="value-input"
              />
              <CalculatorKeyboard 
                onKeyPress={(key) => handleKeyPress(key, 1)}
                onClear={() => handleClear(1)}
                onDelete={() => handleDelete(1)}
              />
            </div>
            <div className="input-group">
              <label>Masa Molar (g/mol):</label>
              <input 
                type="text" 
                value={inputValue2}
                readOnly
                className="value-input"
              />
              <CalculatorKeyboard 
                onKeyPress={(key) => handleKeyPress(key, 2)}
                onClear={() => handleClear(2)}
                onDelete={() => handleDelete(2)}
              />
            </div>
            <div className="result-group">
              <h3>Resultado:</h3>
              <div className="result-value">{formatResult(result)} mol</div>
              {resultDetails && <div className="result-details">{resultDetails}</div>}
            </div>
          </>
        )}

        {currentSection.id === 'avogadro' && (
          <>
            <div className="input-group">
              <label>Moles (mol):</label>
              <input 
                type="text" 
                value={inputValue1}
                readOnly
                className="value-input"
              />
              <CalculatorKeyboard 
                onKeyPress={(key) => handleKeyPress(key, 1)}
                onClear={() => handleClear(1)}
                onDelete={() => handleDelete(1)}
              />
            </div>
            <div className="result-group">
              <h3>Número de Partículas:</h3>
              <div className="result-value">{formatResult(result)}</div>
              {resultDetails && <div className="result-details">{resultDetails}</div>}
            </div>
            <div className="info-box">
              <p><strong>Número de Avogadro:</strong> {AVOGADRO_NUMBER.toExponential(3)} mol⁻¹</p>
            </div>
          </>
        )}

        {currentSection.id === 'masaMolar' && (
          <>
            <div className="input-group">
              <label>Fórmula Química (ej: H2O, CO2, C6H12O6):</label>
              <input 
                type="text" 
                value={inputFormula}
                onChange={(e) => setInputFormula(e.target.value)}
                className="formula-input"
                placeholder="H2O"
              />
            </div>
            <div className="result-group">
              <h3>Masa Molar:</h3>
              <div className="result-value">{formatResult(result)} g/mol</div>
              {resultDetails && <div className="result-details">{resultDetails}</div>}
            </div>
          </>
        )}

        {currentSection.id === 'composicionPorcentual' && (
          <>
            <div className="input-group">
              <label>Fórmula Química:</label>
              <input 
                type="text" 
                value={inputFormula}
                onChange={(e) => setInputFormula(e.target.value)}
                className="formula-input"
                placeholder="H2O"
              />
            </div>
            <div className="result-group">
              <h3>Composición Porcentual:</h3>
              {typeof result === 'object' && (
                <div className="composition-results">
                  {Object.entries(result).map(([element, percent]) => (
                    <div key={element} className="composition-item">
                      <strong>{element}:</strong> {percent.toFixed(2)}%
                    </div>
                  ))}
                </div>
              )}
              {resultDetails && <div className="result-details">{resultDetails}</div>}
            </div>
          </>
        )}

        {currentSection.id === 'formulasEmpiricaMolecular' && (
          <>
            <div className="input-group">
              <label>Composición Porcentual (ingresa porcentajes):</label>
              <div className="percentage-inputs">
                {['C', 'H', 'O', 'N', 'S', 'Cl'].map(element => (
                  <div key={element} className="percentage-input-item">
                    <label>{element}:</label>
                    <input 
                      type="text" 
                      value={percentageInputs[element] || ''}
                      onChange={(e) => setPercentageInputs(prev => ({
                        ...prev,
                        [element]: e.target.value
                      }))}
                      className="percentage-input"
                      placeholder="0"
                    />
                    <span>%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label>Masa Molecular (g/mol) - Opcional:</label>
              <input 
                type="text" 
                value={molecularMass}
                onChange={(e) => setMolecularMass(e.target.value)}
                className="formula-input"
                placeholder="180.16"
              />
            </div>
            <div className="result-group">
              <h3>Fórmula Empírica:</h3>
              <div className="result-value">{empiricalFormula || 'Ingresa porcentajes'}</div>
              {molecularMass && calculatedMolecular && (
                <>
                  <h3>Fórmula Molecular:</h3>
                  <div className="result-value">{calculatedMolecular}</div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChemistryCalculator;

