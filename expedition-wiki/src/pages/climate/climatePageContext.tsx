import { createContext, useContext } from "react";

import type { ClimatePageModel } from '../../data/models/pages/climatePageModel';

export const ClimatePageContext = createContext<ClimatePageModel | undefined>(undefined);

export function useClimatePageContext() {
  
  const context = useContext(ClimatePageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}