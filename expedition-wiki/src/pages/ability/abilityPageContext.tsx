import { createContext, useContext } from "react";

import type { AbilityPageModel } from '../../data/models/pages/abilityPageModel';

export const AbilityPageContext = createContext<AbilityPageModel | undefined>(undefined);

export function useAbilityPageContext() {
  
  const context = useContext(AbilityPageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}