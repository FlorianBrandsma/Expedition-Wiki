import { createContext, useContext } from "react";

import type { ClassPageModel } from '../../data/models/pages/classPageModel';

export const ClassPageContext = createContext<ClassPageModel | undefined>(undefined);

export function useClassPageContext() {
  
  const context = useContext(ClassPageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}