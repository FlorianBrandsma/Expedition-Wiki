import { createContext, useContext } from "react";

import type { TaskPageModel } from '../../data/models/pages/taskPageModel';

export const TaskPageContext = createContext<TaskPageModel | undefined>(undefined);

export function useTaskPageContext() {
  
  const context = useContext(TaskPageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}