import { createContext, useContext } from "react";

import type { FactionModel } from '../../data/models/factionModel';

export const FactionContext = createContext<FactionModel | undefined>(undefined);

export function useFactionContext() {
  
  const context = useContext(FactionContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}