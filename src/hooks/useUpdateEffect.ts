import * as React from "react";

export const useUpdateEffect = (
  callback: React.EffectCallback,
  deps: React.DependencyList
) => {
  const firstTimeFlag = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (firstTimeFlag.current) {
      firstTimeFlag.current = false;   
      return
    }
    callback()
    firstTimeFlag.current = false;
  }, [...deps, callback])
}