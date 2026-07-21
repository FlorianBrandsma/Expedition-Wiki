import { createContext, useContext } from "react";

import type { AbilityModel } from '../../data/models/abilityModel';

export const AbilityContext = createContext<AbilityModel | undefined>(undefined);

export function useAbilityContext() {
  
  const context = useContext(AbilityContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}