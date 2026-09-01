import { createContext, useContext } from "react";

import type { InteractablePageModel } from '../../data/models/pages/interactablePageModel';

export const InteractablePageContext = createContext<InteractablePageModel | undefined>(undefined);

export function useInteractablePageContext() {
  
  const context = useContext(InteractablePageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}