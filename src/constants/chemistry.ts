// Constantes y datos para cálculos químicos
// Masas atómicas en g/mol (valores estándar IUPAC)

export const ATOMIC_MASSES: Record<string, number> = {
  // Elementos comunes
  'H': 1.008,      // Hidrógeno
  'He': 4.003,     // Helio
  'Li': 6.941,     // Litio
  'Be': 9.012,     // Berilio
  'B': 10.81,      // Boro
  'C': 12.011,     // Carbono
  'N': 14.007,     // Nitrógeno
  'O': 16.00,      // Oxígeno
  'F': 18.998,     // Flúor
  'Ne': 20.180,    // Neón
  'Na': 22.990,    // Sodio
  'Mg': 24.305,    // Magnesio
  'Al': 26.982,    // Aluminio
  'Si': 28.085,    // Silicio
  'P': 30.974,     // Fósforo
  'S': 32.065,     // Azufre
  'Cl': 35.453,    // Cloro
  'Ar': 39.948,    // Argón
  'K': 39.098,     // Potasio
  'Ca': 40.078,    // Calcio
  'Fe': 55.845,    // Hierro
  'Cu': 63.546,    // Cobre
  'Zn': 65.38,     // Zinc
  'Br': 79.904,    // Bromo
  'Ag': 107.87,    // Plata
  'I': 126.90,     // Yodo
  'Ba': 137.33,    // Bario
  'Pb': 207.2,     // Plomo
  'Cr': 51.996,    // Cromo
  'Mn': 54.938,    // Manganeso
  'Co': 58.933,    // Cobalto
  'Ni': 58.693,    // Níquel
  'Se': 78.96,     // Selenio
  'Sn': 118.71,    // Estaño
  'Ti': 47.867,    // Titanio
  'V': 50.942,     // Vanadio
  'W': 183.84,     // Wolframio
  'Mo': 95.96,     // Molibdeno
  'Pt': 195.08,    // Platino
  'Au': 196.97,    // Oro
  'Hg': 200.59,    // Mercurio
  'Cd': 112.41,    // Cadmio
  'As': 74.922,    // Arsénico
  'Sb': 121.76,    // Antimonio
  'Bi': 208.98,    // Bismuto
  'U': 238.03,     // Uranio
};

// Número de Avogadro
export const AVOGADRO_NUMBER = 6.02214076e23; // mol⁻¹

// Información de las secciones de cálculo
export interface ChemistrySection {
  id: string;
  name: string;
  icon: string; // Nombre del icono de Lucide
  description: string;
  definition: string;
  formula: string;
  applications: string[];
  examples: string[];
}

export const CHEMISTRY_SECTIONS: Record<string, ChemistrySection> = {
  moles: {
    id: 'moles',
    name: 'Moles',
    icon: 'Beaker',
    description: 'Calcula el número de moles a partir de masa, volumen o número de partículas',
    definition: 'El mol es la unidad de cantidad de sustancia en el Sistema Internacional de Unidades. Un mol contiene exactamente 6.02214076×10²³ entidades elementales (átomos, moléculas, iones, etc.). Esta cantidad se conoce como número de Avogadro.',
    formula: 'n = m / M (moles = masa / masa molar)',
    applications: [
      'Cálculo de reactivos en reacciones químicas',
      'Preparación de soluciones con concentración molar',
      'Análisis estequiométrico',
      'Determinación de cantidades en síntesis química'
    ],
    examples: [
      'Calcular moles de agua en 18 g: n = 18 g / 18 g/mol = 1 mol',
      'Determinar moles de CO₂ en 44 g: n = 44 g / 44 g/mol = 1 mol',
      'Hallar moles de NaCl en 58.5 g: n = 58.5 g / 58.5 g/mol = 1 mol'
    ]
  },
  avogadro: {
    id: 'avogadro',
    name: 'Número de Avogadro, Átomos y Moléculas',
    icon: 'Atom',
    description: 'Convierte entre moles, número de partículas y número de Avogadro',
    definition: 'El número de Avogadro (NA) es el número de partículas elementales (átomos, moléculas, iones) contenidas en un mol de sustancia. Su valor es 6.02214076×10²³ mol⁻¹. Permite relacionar la cantidad microscópica (número de partículas) con la cantidad macroscópica (moles).',
    formula: 'N = n × NA (número de partículas = moles × número de Avogadro)',
    applications: [
      'Determinar número de átomos en una muestra',
      'Calcular moléculas presentes en una reacción',
      'Análisis de estructuras cristalinas',
      'Cálculos en química cuántica'
    ],
    examples: [
      '1 mol de H₂O contiene 6.022×10²³ moléculas',
      '0.5 mol de C contiene 3.011×10²³ átomos',
      '2 mol de O₂ contiene 1.204×10²⁴ moléculas'
    ]
  },
  masaMolar: {
    id: 'masaMolar',
    name: 'Masa Molar',
    icon: 'Scale',
    description: 'Calcula la masa molar de compuestos y elementos',
    definition: 'La masa molar (M) es la masa de un mol de una sustancia, expresada en gramos por mol (g/mol). Para un elemento, es igual a su masa atómica. Para un compuesto, se calcula sumando las masas atómicas de todos los átomos que forman la molécula.',
    formula: 'M = Σ(masas atómicas) (masa molar = suma de masas atómicas)',
    applications: [
      'Identificación de compuestos desconocidos',
      'Cálculo de reactivos en síntesis',
      'Análisis de pureza de sustancias',
      'Determinación de fórmulas moleculares'
    ],
    examples: [
      'Masa molar de H₂O: 2(1.008) + 16.00 = 18.016 g/mol',
      'Masa molar de CO₂: 12.011 + 2(16.00) = 44.011 g/mol',
      'Masa molar de C₆H₁₂O₆: 6(12.011) + 12(1.008) + 6(16.00) = 180.156 g/mol'
    ]
  },
  composicionPorcentual: {
    id: 'composicionPorcentual',
    name: 'Composición Porcentual y Centesimal',
    icon: 'PieChart',
    description: 'Determina el porcentaje en masa de cada elemento en un compuesto',
    definition: 'La composición porcentual (o centesimal) expresa el porcentaje en masa de cada elemento presente en un compuesto. Se calcula dividiendo la masa del elemento en un mol del compuesto entre la masa molar total y multiplicando por 100.',
    formula: '% elemento = (masa del elemento / masa molar del compuesto) × 100',
    applications: [
      'Verificación de pureza de compuestos',
      'Análisis de minerales',
      'Control de calidad en industria química',
      'Determinación de fórmulas empíricas'
    ],
    examples: [
      'H₂O: %H = (2.016/18.016) × 100 = 11.19%, %O = 88.81%',
      'CO₂: %C = (12.011/44.011) × 100 = 27.29%, %O = 72.71%',
      'NaCl: %Na = (22.990/58.443) × 100 = 39.34%, %Cl = 60.66%'
    ]
  },
  formulasEmpiricaMolecular: {
    id: 'formulasEmpiricaMolecular',
    name: 'Fórmula Empírica y Molecular',
    icon: 'FlaskConical',
    description: 'Determina fórmulas empíricas y moleculares a partir de composición',
    definition: 'La fórmula empírica muestra la proporción más simple de átomos en un compuesto. La fórmula molecular indica el número real de átomos de cada elemento. La relación entre ambas es: fórmula molecular = (fórmula empírica)ₙ, donde n es un número entero.',
    formula: 'Fórmula molecular = (Fórmula empírica)ₙ, donde n = Masa molecular / Masa empírica',
    applications: [
      'Identificación de compuestos orgánicos',
      'Análisis de polímeros',
      'Determinación de estructuras químicas',
      'Síntesis de nuevos materiales'
    ],
    examples: [
      'Etileno (C₂H₄): empírica CH₂, molecular C₂H₄ (n=2). Masa molar: 28.05 g/mol',
      'Acetato de vinilo (C₄H₆O₂): empírica C₂H₃O, molecular C₄H₆O₂ (n=2). Masa molar: 86.09 g/mol. Composición: C 55.81%, H 7.02%, O 37.17%',
      'Glucosa (C₆H₁₂O₆): empírica CH₂O, molecular C₆H₁₂O₆ (n=6). Masa molar: 180.16 g/mol',
      'Benceno (C₆H₆): empírica CH, molecular C₆H₆ (n=6). Masa molar: 78.11 g/mol'
    ]
  }
};

// Función para parsear fórmula química
export interface ParsedFormula {
  elements: Record<string, number>;
  formula: string;
}

export function parseFormula(formula: string): ParsedFormula {
  const elements: Record<string, number> = {};
  
  // Limpiar espacios y convertir a formato estándar
  formula = formula.trim().replace(/\s+/g, '');
  
  // Manejar paréntesis y grupos (ej: Ca(OH)2, Al2(SO4)3)
  // Primero, expandir grupos con paréntesis
  const expandGroups = (f: string): string => {
    const groupRegex = /\(([A-Za-z0-9]+)\)(\d*)/g;
    let expanded = f;
    let match;
    
    while ((match = groupRegex.exec(f)) !== null) {
      const groupContent = match[1];
      const multiplier = match[2] ? parseInt(match[2], 10) : 1;
      const expandedGroup = groupContent.replace(/([A-Z][a-z]*)(\d*)/g, (_, elem, num) => {
        const count = num ? parseInt(num, 10) : 1;
        return elem + (count * multiplier);
      });
      expanded = expanded.replace(match[0], expandedGroup);
    }
    
    return expanded;
  };
  
  formula = expandGroups(formula);
  
  // Parsear elementos (formato: ElementoNúmero o solo Elemento)
  const regex = /([A-Z][a-z]*)(\d*)/g;
  let match;
  
  while ((match = regex.exec(formula)) !== null) {
    const element = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;
    
    // Verificar que el elemento existe en nuestra tabla
    if (ATOMIC_MASSES[element]) {
      elements[element] = (elements[element] || 0) + count;
    }
  }
  
  return { elements, formula };
}

// Calcular masa molar de una fórmula
export function calculateMolarMass(formula: string): number {
  const parsed = parseFormula(formula);
  let totalMass = 0;
  
  for (const [element, count] of Object.entries(parsed.elements)) {
    const atomicMass = ATOMIC_MASSES[element];
    if (atomicMass) {
      totalMass += atomicMass * count;
    }
  }
  
  return totalMass;
}

// Calcular composición porcentual
export function calculatePercentageComposition(formula: string): Record<string, number> {
  const molarMass = calculateMolarMass(formula);
  const parsed = parseFormula(formula);
  const composition: Record<string, number> = {};
  
  for (const [element, count] of Object.entries(parsed.elements)) {
    const atomicMass = ATOMIC_MASSES[element];
    if (atomicMass) {
      const elementMass = atomicMass * count;
      composition[element] = (elementMass / molarMass) * 100;
    }
  }
  
  return composition;
}

// Calcular fórmula empírica a partir de porcentajes
export function calculateEmpiricalFormula(percentages: Record<string, number>): string {
  // Convertir porcentajes a moles relativos
  const moles: Record<string, number> = {};
  
  for (const [element, percent] of Object.entries(percentages)) {
    const atomicMass = ATOMIC_MASSES[element];
    if (atomicMass && percent > 0) {
      moles[element] = percent / atomicMass;
    }
  }
  
  if (Object.keys(moles).length === 0) return '';
  
  // Encontrar el menor valor
  const minMoles = Math.min(...Object.values(moles));
  
  // Dividir todos por el menor para obtener números enteros
  const ratios: Record<string, number> = {};
  for (const [element, mol] of Object.entries(moles)) {
    ratios[element] = mol / minMoles;
  }
  
  // Función para encontrar el máximo común divisor
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };
  
  // Multiplicar por un factor común para obtener enteros
  let multiplier = 1;
  const decimals = Object.values(ratios).map(r => {
    const decimal = r - Math.floor(r);
    return decimal > 0.001 ? decimal : 0;
  });
  
  // Si hay decimales, multiplicar por 100 y encontrar MCD
  if (decimals.some(d => d > 0)) {
    const multiplied = Object.values(ratios).map(r => Math.round(r * 100));
    let commonDivisor = multiplied[0];
    for (let i = 1; i < multiplied.length; i++) {
      commonDivisor = gcd(commonDivisor, multiplied[i]);
    }
    multiplier = 100 / commonDivisor;
  } else {
    // Ya son enteros, encontrar MCD
    const integers = Object.values(ratios).map(r => Math.round(r));
    let commonDivisor = integers[0];
    for (let i = 1; i < integers.length; i++) {
      commonDivisor = gcd(commonDivisor, integers[i]);
    }
    multiplier = 1 / commonDivisor;
  }
  
  // Aplicar multiplicador y redondear
  const rounded: Record<string, number> = {};
  for (const [element, ratio] of Object.entries(ratios)) {
    rounded[element] = Math.round(ratio * multiplier);
  }
  
  // Construir fórmula (ordenar elementos: C, H, luego alfabéticamente)
  const elementOrder = ['C', 'H', 'O', 'N', 'S', 'Cl', 'Br', 'I', 'F', 'P'];
  const sortedElements = Object.keys(rounded).sort((a, b) => {
    const indexA = elementOrder.indexOf(a);
    const indexB = elementOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
  
  let formula = '';
  for (const element of sortedElements) {
    const count = rounded[element];
    if (count > 0) {
      formula += element;
      if (count > 1) {
        formula += count;
      }
    }
  }
  
  return formula;
}

// Calcular fórmula molecular a partir de empírica y masa molecular
export function calculateMolecularFormula(empiricalFormula: string, molecularMass: number): string {
  if (!empiricalFormula || molecularMass <= 0) return '';
  
  const empiricalMass = calculateMolarMass(empiricalFormula);
  if (empiricalMass <= 0) return '';
  
  const n = Math.round(molecularMass / empiricalMass);
  if (n <= 0) return '';
  
  // Multiplicar cada elemento por n
  const parsed = parseFormula(empiricalFormula);
  const molecular: Record<string, number> = {};
  
  for (const [element, count] of Object.entries(parsed.elements)) {
    molecular[element] = count * n;
  }
  
  // Construir fórmula molecular
  const elementOrder = ['C', 'H', 'O', 'N', 'S', 'Cl', 'Br', 'I', 'F', 'P'];
  const sortedElements = Object.keys(molecular).sort((a, b) => {
    const indexA = elementOrder.indexOf(a);
    const indexB = elementOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
  
  let formula = '';
  for (const element of sortedElements) {
    const count = molecular[element];
    if (count > 0) {
      formula += element;
      if (count > 1) {
        formula += count;
      }
    }
  }
  
  return formula;
}

