'use client';

import { useEffect } from 'react';

export default function TestErrorPage() {
  useEffect(() => {
    // Forzamos un error en el efecto para que ocurra después del montaje del componente
    throw new Error('Este es un error de prueba');
  }, []);

  return <div>Esta página forzará un error...</div>;
} 