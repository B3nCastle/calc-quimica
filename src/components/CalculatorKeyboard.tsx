import React, { useState } from 'react';

interface CalculatorKeyboardProps {
  onInput: (value: string) => void;
}

const CalculatorKeyboard: React.FC<CalculatorKeyboardProps> = ({ onInput }) => {
  const [currentInput, setCurrentInput] = useState<string>('');

  // Función para manejar clics de botones
  const handleButtonClick = (value: string) => {
    let newInput: string;

    switch (value) {
      case 'C':
        // Limpiar todo
        newInput = '';
        break;
      case '⌫':
        // Borrar último carácter
        newInput = currentInput.slice(0, -1);
        break;
      case 'x²':
        // Agregar potencia al cuadrado
        newInput = currentInput + '²';
        break;
      case 'x³':
        // Agregar potencia al cubo
        newInput = currentInput + '³';
        break;
      case 'xⁿ':
        // Agregar notación de potencia científica
        newInput = currentInput + '×10^';
        break;
      case '×':
      case '÷':
      case '+':
      case '-':
        // Operadores matemáticos
        newInput = currentInput + value;
        break;
      case '(':
      case ')':
        // Paréntesis
        newInput = currentInput + value;
        break;
      default:
        // Números y punto decimal
        newInput = currentInput + value;
        break;
    }

    setCurrentInput(newInput);
    onInput(newInput || '0');
  };

  // Configuración de botones
  const keypadButtons = [
    // Fila 1: Funciones y operaciones
    [
      { label: 'C', variant: 'danger', size: 'lg' },
      { label: '⌫', variant: 'warning', size: 'lg' },
      { label: '(', variant: 'info', size: 'lg' },
      { label: ')', variant: 'info', size: 'lg' }
    ],
    // Fila 2: Potencias y operador
    [
      { label: 'x²', variant: 'success', size: 'lg' },
      { label: 'x³', variant: 'success', size: 'lg' },
      { label: 'xⁿ', variant: 'success', size: 'lg' },
      { label: '÷', variant: 'info', size: 'lg' }
    ],
    // Fila 3: Números y operador
    [
      { label: '7', variant: 'secondary', size: 'lg' },
      { label: '8', variant: 'secondary', size: 'lg' },
      { label: '9', variant: 'secondary', size: 'lg' },
      { label: '×', variant: 'info', size: 'lg' }
    ],
    // Fila 4: Números y operador
    [
      { label: '4', variant: 'secondary', size: 'lg' },
      { label: '5', variant: 'secondary', size: 'lg' },
      { label: '6', variant: 'secondary', size: 'lg' },
      { label: '-', variant: 'info', size: 'lg' }
    ],
    // Fila 5: Números y operador
    [
      { label: '1', variant: 'secondary', size: 'lg' },
      { label: '2', variant: 'secondary', size: 'lg' },
      { label: '3', variant: 'secondary', size: 'lg' },
      { label: '+', variant: 'info', size: 'lg' }
    ],
    // Fila 6: Cero y decimal
    [
      { label: '0', variant: 'secondary', size: 'lg', colspan: 2 },
      { label: '.', variant: 'secondary', size: 'lg' },
      { label: '=', variant: 'primary', size: 'lg' }
    ]
  ];

  return (
    <div className="card shadow border-0">
      <div className="card-header bg-dark text-white">
        <h5 className="card-title mb-0">
          <i className="bi bi-keyboard me-2"></i>
          Teclado de calculadora
        </h5>
      </div>
      <div className="card-body p-3">
        {/* Display del input actual */}
        <div className="mb-3">
          <div className="form-control form-control-lg text-end bg-light border-2" 
               style={{ minHeight: '60px', fontSize: '1.2rem', fontFamily: 'monospace' }}>
            {currentInput || '0'}
          </div>
        </div>

        {/* Grid de botones */}
        <div className="d-grid gap-2">
          {keypadButtons.map((row, rowIndex) => (
            <div key={rowIndex} className="row g-2">
              {row.map((button, colIndex) => (
                <div 
                  key={colIndex} 
                  className={button.colspan ? `col-${6 * button.colspan}` : 'col-3'}
                >
                  <button
                    type="button"
                    className={`btn btn-${button.variant} btn-${button.size} w-100`}
                    onClick={() => handleButtonClick(button.label)}
                    style={{ 
                      minHeight: '50px',
                      fontSize: '1.1rem',
                      fontWeight: 'bold'
                    }}
                    title={getButtonTooltip(button.label)}
                  >
                    {button.label}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Instrucciones de uso */}
        <div className="mt-3">
          <div className="alert alert-info py-2 mb-0">
            <small>
              <i className="bi bi-info-circle me-1"></i>
              <strong>Instrucciones:</strong> Usa los botones para introducir números y operaciones.
              Soporta potencias (x², x³, xⁿ), operaciones básicas (+, -, ×, ÷) y paréntesis.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

// Función auxiliar para tooltips de botones
const getButtonTooltip = (label: string): string => {
  const tooltips: Record<string, string> = {
    'C': 'Limpiar todo (Clear)',
    '⌫': 'Borrar último carácter (Backspace)',
    'x²': 'Elevar al cuadrado',
    'x³': 'Elevar al cubo',
    'xⁿ': 'Notación científica (×10^n)',
    '×': 'Multiplicación',
    '÷': 'División',
    '+': 'Suma',
    '-': 'Resta',
    '(': 'Paréntesis izquierdo',
    ')': 'Paréntesis derecho',
    '.': 'Punto decimal',
    '=': 'Aplicar resultado (igual que hacer clic fuera)'
  };
  
  return tooltips[label] || `Insertar ${label}`;
};

export default CalculatorKeyboard; 