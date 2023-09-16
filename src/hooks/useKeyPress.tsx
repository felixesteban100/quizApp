import { useEffect } from 'react';

function useKeyPress(comboKey: string, action: () => void) {
    useEffect(() => {
      function handleKeyPress(event: KeyboardEvent) {
        if (event.ctrlKey && (event.key.toLowerCase() || event.key.toUpperCase()) === comboKey) {
          action();
        }

        if(event.key === 'Enter'){
            action();
        }
      }
  
      document.addEventListener('keydown', handleKeyPress);
  
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [comboKey, action]);
  }

export default useKeyPress