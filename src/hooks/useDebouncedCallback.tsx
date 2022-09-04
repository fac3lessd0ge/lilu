import * as React from 'react';

export const useDebouncedCallback = (callback: Function, dependencyArray: any[], delay: number) => {

  React.useEffect(() => {
    
    const timeout = setTimeout(() => callback(), delay)

    return () => clearTimeout(timeout)

  }, [...dependencyArray])

}