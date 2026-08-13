import { createContext, useContext } from "react";

import type { EffectPageModel } from '../../data/models/pages/effectPageModel';

export const EffectPageContext = createContext<EffectPageModel | undefined>(undefined);

export function useEffectPageContext() {
  
  const context = useContext(EffectPageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}