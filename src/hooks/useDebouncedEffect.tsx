import * as React from 'react';

export const useDebouncedEffect = (callback: Function, dependencyArray: any[], delay: number) => {

  React.useEffect(() => {
    
    const timeout = setTimeout(() => {callback()}, delay)

    return () => clearTimeout(timeout)

  }, [...dependencyArray])

}