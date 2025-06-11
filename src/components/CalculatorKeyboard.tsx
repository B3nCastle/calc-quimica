import React from 'react';
import './CalculatorKeyboard.css';

interface CalculatorKeyboardProps {
  onKeyPress: (key: string) => void;
  onClear: () => void;
  onDelete: () => void;
}

const CalculatorKeyboard: React.FC<CalculatorKeyboardProps> = ({ 
  onKeyPress, 
  onClear, 
  onDelete 
}) => {
  // Teclas numéricas y funciones especiales
  const keys = [
    ['7', '8', '9', 'C'],
    ['4', '5', '6', '⌫'],
    ['1', '2', '3', 'x²'],
    ['0', '.', 'x³', 'xⁿ']
  ];

  const handleKeyClick = (key: string) => {
    if (key === 'C') {
      onClear();
    } else if (key === '⌫') {
      onDelete();
    } else if (key === 'x²') {
      onKeyPress('²');
    } else if (key === 'x³') {
      onKeyPress('³');
    } else if (key === 'xⁿ') {
      onKeyPress('^');
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="calculator-keyboard">
      <h3>Teclado Numérico</h3>
      <div className="keyboard-grid">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                className={`keyboard-key ${
                  key === 'C' ? 'clear' : 
                  key === '⌫' ? 'delete' : 
                  ['x²', 'x³', 'xⁿ'].includes(key) ? 'function' : 
                  'number'
                }`}
                onClick={() => handleKeyClick(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="keyboard-instructions">
        <small>
          • C: Limpiar todo<br/>
          • ⌫: Borrar último carácter<br/>
          • x²/x³/xⁿ: Potencias (use ^ para exponentes personalizados)
        </small>
      </div>
    </div>
  );
};

export default CalculatorKeyboard; 