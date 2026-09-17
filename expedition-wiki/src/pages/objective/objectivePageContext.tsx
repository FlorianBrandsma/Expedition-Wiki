import { createContext, useContext } from "react";

import type { ObjectivePageModel } from '../../data/models/pages/objectivePageModel';

export const ObjectivePageContext = createContext<ObjectivePageModel | undefined>(undefined);

export function useObjectivePageContext() {
  
  const context = useContext(ObjectivePageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}