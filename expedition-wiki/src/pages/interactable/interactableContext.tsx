import { createContext, useContext } from "react";

import type { InteractableModel } from '../../data/models/interactableModel';

export const InteractableContext = createContext<InteractableModel | undefined>(undefined);

export function useInteractableContext() {
  
  const context = useContext(InteractableContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}