import React from 'react';
import * as LucideIcons from 'lucide-react';

// Helper para obtener iconos de Lucide por nombre
export const getIcon = (iconName: string, props?: React.SVGProps<SVGSVGElement>) => {
  const IconComponent = (LucideIcons as any)[iconName] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  
  if (!IconComponent) {
    // Icono por defecto si no se encuentra
    const DefaultIcon = LucideIcons.Beaker;
    return <DefaultIcon {...props} />;
  }
  
  return <IconComponent {...props} />;
};

