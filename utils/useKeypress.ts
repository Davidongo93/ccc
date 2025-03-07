import { useEffect } from 'react';

/**
 * Hook personalizado para detectar la pulsación de una tecla específica.
 *
 * @param targetKey - La tecla que deseas detectar.
 * @param handler - La función que se ejecutará al presionar la tecla.
 */
export default function useKeypress(targetKey: string, handler: () => void) {
  useEffect(() => {
    const keyPressHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        handler();
      }
    };

    // Escuchar eventos de teclado
    window.addEventListener('keydown', keyPressHandler);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [targetKey, handler]);
}
