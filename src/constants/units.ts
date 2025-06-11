import type { UnitGroup } from '../types';

// Configuración completa de las unidades del Sistema Internacional
export const UNIT_GROUPS: Record<string, UnitGroup> = {
  longitud: {
    name: 'Longitud',
    baseUnit: 'm',
    units: {
      m: { symbol: 'm', name: 'Metro', factor: 1 },
      km: { symbol: 'km', name: 'Kilómetro', factor: 1000 },
      cm: { symbol: 'cm', name: 'Centímetro', factor: 0.01 },
      mm: { symbol: 'mm', name: 'Milímetro', factor: 0.001 },
      nm: { symbol: 'nm', name: 'Nanómetro', factor: 1e-9 },
      // Unidades imperiales
      yd: { symbol: 'yd', name: 'Yarda', factor: 0.9144 },
      in: { symbol: 'in', name: 'Pulgada', factor: 0.0254 },
      ft: { symbol: 'ft', name: 'Pie', factor: 0.3048 }
    }
  },
  masa: {
    name: 'Masa',
    baseUnit: 'kg',
    units: {
      kg: { symbol: 'kg', name: 'Kilogramo', factor: 1 },
      g: { symbol: 'g', name: 'Gramo', factor: 0.001 },
      mg: { symbol: 'mg', name: 'Miligramo', factor: 0.000001 },
      t: { symbol: 't', name: 'Tonelada', factor: 1000 },
      µg: { symbol: 'µg', name: 'Microgramo', factor: 1e-9 }
    }
  },
  tiempo: {
    name: 'Tiempo',
    baseUnit: 's',
    units: {
      s: { symbol: 's', name: 'Segundo', factor: 1 },
      min: { symbol: 'min', name: 'Minuto', factor: 60 },
      h: { symbol: 'h', name: 'Hora', factor: 3600 },
      ms: { symbol: 'ms', name: 'Milisegundo', factor: 0.001 }
    }
  },
  volumen: {
    name: 'Volumen',
    baseUnit: 'm³',
    units: {
      'm³': { symbol: 'm³', name: 'Metro cúbico', factor: 1 },
      L: { symbol: 'L', name: 'Litro', factor: 0.001 },
      mL: { symbol: 'mL', name: 'Mililitro', factor: 0.000001 },
      µL: { symbol: 'µL', name: 'Microlitro', factor: 1e-9 },
      gal: { symbol: 'gal', name: 'Galón (US)', factor: 0.003785411784 },
      'cm³': { symbol: 'cm³', name: 'Centímetro cúbico', factor: 0.000001 },
      'dm³': { symbol: 'dm³', name: 'Decímetro cúbico', factor: 0.001 }
    }
  },
  densidad: {
    name: 'Densidad',
    baseUnit: 'kg/m³',
    units: {
      'kg/m³': { symbol: 'kg/m³', name: 'Kilogramo por metro cúbico', factor: 1 },
      'g/cm³': { symbol: 'g/cm³', name: 'Gramo por centímetro cúbico', factor: 1000 },
      'g/mL': { symbol: 'g/mL', name: 'Gramo por mililitro', factor: 1000 },
      'kg/L': { symbol: 'kg/L', name: 'Kilogramo por litro', factor: 1000 },
      'g/L': { symbol: 'g/L', name: 'Gramo por litro', factor: 1 },
      'mg/mL': { symbol: 'mg/mL', name: 'Miligramo por mililitro', factor: 1 }
    }
  },
  presion: {
    name: 'Presión',
    baseUnit: 'Pa',
    units: {
      Pa: { symbol: 'Pa', name: 'Pascal', factor: 1 },
      kPa: { symbol: 'kPa', name: 'Kilopascal', factor: 1000 },
      atm: { symbol: 'atm', name: 'Atmósfera', factor: 101325 },
      mmHg: { symbol: 'mmHg', name: 'Milímetro de mercurio', factor: 133.322 },
      Torr: { symbol: 'Torr', name: 'Torr', factor: 133.322 },
      psi: { symbol: 'psi', name: 'Libra por pulgada cuadrada', factor: 6894.76 },
      bar: { symbol: 'bar', name: 'Bar', factor: 100000 }
    }
  },
  fuerza: {
    name: 'Fuerza',
    baseUnit: 'N',
    units: {
      N: { symbol: 'N', name: 'Newton', factor: 1 },
      kN: { symbol: 'kN', name: 'Kilonewton', factor: 1000 },
      µN: { symbol: 'µN', name: 'Micronewton', factor: 0.000001 },
      dyn: { symbol: 'dyn', name: 'Dina', factor: 0.00001 },
      kgf: { symbol: 'kgf', name: 'Kilogramo fuerza', factor: 9.80665 },
      lbf: { symbol: 'lbf', name: 'Libra fuerza', factor: 4.448222 }
    }
  },
  energia: {
    name: 'Energía',
    baseUnit: 'J',
    units: {
      J: { symbol: 'J', name: 'Julio', factor: 1 },
      kJ: { symbol: 'kJ', name: 'Kilojulio', factor: 1000 },
      cal: { symbol: 'cal', name: 'Caloría', factor: 4.184 },
      kcal: { symbol: 'kcal', name: 'Kilocaloría', factor: 4184 },
      Wh: { symbol: 'Wh', name: 'Vatio-hora', factor: 3600 },
      kWh: { symbol: 'kWh', name: 'Kilovatio-hora', factor: 3600000 },
      eV: { symbol: 'eV', name: 'Electronvoltio', factor: 1.602176634e-19 }
    }
  }
};

// Función para realizar conversiones entre unidades
export const convertUnits = (value: number, fromUnit: string, toUnit: string, magnitude: string): number => {
  const unitGroup = UNIT_GROUPS[magnitude];
  if (!unitGroup) return 0;
  
  const fromFactor = unitGroup.units[fromUnit]?.factor || 0;
  const toFactor = unitGroup.units[toUnit]?.factor || 0;
  
  if (fromFactor === 0 || toFactor === 0) return 0;
  
  // Convertir a unidad base y luego a unidad destino
  const baseValue = value * fromFactor;
  return baseValue / toFactor;
};

// Información detallada de cada magnitud basada en fuentes académicas
export const MAGNITUDE_INFO: Record<string, {
  definition: string;
  baseUnitDefinition: string;
  applications: string[];
  formula?: string;
  examples: string[];
}> = {
  longitud: {
    definition: "La longitud es una magnitud física fundamental que expresa la distancia entre dos puntos en el espacio.",
    baseUnitDefinition: "El metro se define como la distancia que recorre la luz en el vacío en 1/299,792,458 segundos.",
    applications: [
      "Medición de distancias en construcción e ingeniería",
      "Navegación y cartografía",
      "Investigación científica y astronomía",
      "Diseño industrial y manufactura"
    ],
    examples: [
      "Un campo de fútbol mide aproximadamente 100 metros de largo",
      "La altura promedio de una persona adulta es 1.7 metros",
      "El diámetro de un átomo de hidrógeno es aproximadamente 0.1 nanómetros"
    ]
  },
  masa: {
    definition: "La masa es una magnitud física que expresa la cantidad de materia que contiene un cuerpo.",
    baseUnitDefinition: "El kilogramo se define mediante la constante de Planck: h = 6.626070×10⁻³⁴ kg⋅m²⋅s⁻¹.",
    applications: [
      "Química analítica y síntesis",
      "Industria farmacéutica",
      "Control de calidad en alimentos",
      "Investigación biomédica"
    ],
    formula: "m = ρ × V (masa = densidad × volumen)",
    examples: [
      "Una botella de agua de 1 litro tiene una masa de aproximadamente 1 kilogramo",
      "Un medicamento puede contener 500 miligramos de principio activo",
      "La masa de un electrón es 9.109×10⁻³¹ kilogramos"
    ]
  },
  tiempo: {
    definition: "El tiempo es una magnitud física que permite ordenar la secuencia de sucesos estableciendo un pasado, presente y futuro.",
    baseUnitDefinition: "El segundo se define como la duración de 9,192,631,770 períodos de la radiación del átomo de cesio-133.",
    applications: [
      "Sincronización de sistemas de comunicación",
      "Navegación por satélite (GPS)",
      "Investigación en física de partículas",
      "Cronometraje deportivo de alta precisión"
    ],
    examples: [
      "Un latido del corazón humano dura aproximadamente 1 segundo",
      "La luz tarda 8 minutos y 20 segundos en viajar del Sol a la Tierra",
      "Los relojes atómicos pueden medir el tiempo con precisión de nanosegundos"
    ]
  },
  volumen: {
    definition: "El volumen es la magnitud física que expresa la extensión de un cuerpo en tres dimensiones: largo, ancho y alto.",
    baseUnitDefinition: "El metro cúbico es el volumen de un cubo cuyos lados miden exactamente un metro.",
    applications: [
      "Dosificación de medicamentos líquidos",
      "Control de procesos industriales",
      "Medición de capacidades de almacenamiento",
      "Preparación de soluciones químicas"
    ],
    formula: "V = l × w × h (para prismas rectangulares)",
    examples: [
      "Una botella de refresco contiene 500 mililitros",
      "La capacidad de un tanque de gasolina es de 50 litros",
      "Una piscina olímpica contiene 2,500 metros cúbicos de agua"
    ]
  },
  densidad: {
    definition: "La densidad es la magnitud que relaciona la masa de un cuerpo con el volumen que ocupa.",
    baseUnitDefinition: "Kilogramo por metro cúbico expresa cuántos kilogramos de masa hay en cada metro cúbico de volumen.",
    applications: [
      "Control de calidad en la industria alimentaria",
      "Separación de materiales por flotación",
      "Caracterización de materiales en ingeniería",
      "Análisis geológico y minero"
    ],
    formula: "ρ = m/V (densidad = masa/volumen)",
    examples: [
      "La densidad del agua pura es 1000 kg/m³ a 4°C",
      "El oro tiene una densidad de 19,300 kg/m³",
      "La densidad del aire a nivel del mar es 1.225 kg/m³"
    ]
  },
  presion: {
    definition: "La presión es la magnitud que relaciona la fuerza aplicada perpendicularmente sobre una superficie con el área de dicha superficie.",
    baseUnitDefinition: "El pascal se define como la presión ejercida por una fuerza de un newton sobre una superficie de un metro cuadrado.",
    applications: [
      "Meteorología y predicción del tiempo",
      "Medicina (presión arterial, presión intracraneal)",
      "Ingeniería de fluidos y sistemas hidráulicos",
      "Industria del petróleo y gas"
    ],
    formula: "P = F/A (presión = fuerza/área)",
    examples: [
      "La presión atmosférica a nivel del mar es 101,325 Pa (1 atm)",
      "La presión arterial normal es aproximadamente 120/80 mmHg",
      "Los neumáticos de un automóvil operan a 30-35 psi"
    ]
  },
  fuerza: {
    definition: "La fuerza es una magnitud vectorial que representa la interacción que puede cambiar el estado de movimiento o deformación de un cuerpo.",
    baseUnitDefinition: "El newton se define como la fuerza necesaria para acelerar un kilogramo de masa a un metro por segundo cuadrado.",
    applications: [
      "Diseño estructural en ingeniería civil",
      "Análisis biomecánico del movimiento humano",
      "Desarrollo de vehículos y motores",
      "Investigación en ciencias de materiales"
    ],
    formula: "F = ma (Segunda Ley de Newton: fuerza = masa × aceleración)",
    examples: [
      "El peso de un objeto de 1 kg en la Tierra es aproximadamente 9.8 N",
      "La fuerza de un motor de automóvil puede ser de varios kilonewtons",
      "La fuerza entre átomos se mide en piconewtons"
    ]
  },
  energia: {
    definition: "La energía es la capacidad de realizar trabajo o producir cambios en la materia.",
    baseUnitDefinition: "El julio se define como la energía gastada al aplicar una fuerza de un newton a través de una distancia de un metro.",
    applications: [
      "Cálculo del consumo energético en edificios",
      "Nutrición y metabolismo humano",
      "Eficiencia de motores y máquinas",
      "Desarrollo de fuentes de energía renovable"
    ],
    formula: "E = mc² (equivalencia masa-energía), W = F×d (trabajo = fuerza × distancia)",
    examples: [
      "Una caloría equivale a 4.184 julios de energía",
      "Un kilovatio-hora puede alimentar una bombilla LED de 10W durante 100 horas",
      "La energía de enlace nuclear se mide en mega-electronvoltios (MeV)"
    ]
  }
}; 