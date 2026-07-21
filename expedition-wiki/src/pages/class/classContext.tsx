import { createContext, useContext } from "react";

import type { ClassModel } from '../../data/models/classModel';

export const ClassContext = createContext<ClassModel | undefined>(undefined);

export function useClassContext() {
  
  const context = useContext(ClassContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}