import { createContext, useContext } from "react";

import type { WorldInteractablePageModel } from '../../data/models/pages/worldInteractablePageModel';

export const WorldInteractablePageContext = createContext<WorldInteractablePageModel | undefined>(undefined);

export function useWorldInteractablePageContext() {
  
  const context = useContext(WorldInteractablePageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}