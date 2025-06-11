// Tipos para las diferentes magnitudes de unidades
export type MagnitudeType = 'longitud' | 'masa' | 'tiempo';

// Interfaces para las unidades
export interface Unit {
  symbol: string;
  name: string;
  factor: number; // Factor de conversión a la unidad base
}

export interface UnitGroup {
  name: string;
  baseUnit: string;
  units: Record<string, Unit>;
}

// Tipo para la conversión
export interface Conversion {
  fromUnit: string;
  toUnit: string;
  value: number;
  result: number;
} 