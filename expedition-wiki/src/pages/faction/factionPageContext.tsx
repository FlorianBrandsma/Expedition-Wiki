import { createContext, useContext } from "react";

import type { FactionPageModel } from '../../data/models/pages/factionPageModel';

export const FactionPageContext = createContext<FactionPageModel | undefined>(undefined);

export function useFactionPageContext() {
  
  const context = useContext(FactionPageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}