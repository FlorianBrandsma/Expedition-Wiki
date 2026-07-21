import { createContext, useContext } from "react";

import type { EffectModel } from '../../data/models/effectModel';

export const EffectContext = createContext<EffectModel | undefined>(undefined);

export function useEffectContext() {
  
  const context = useContext(EffectContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}