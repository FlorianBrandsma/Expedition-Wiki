import { createContext, useContext } from "react";

import type { QuestPageModel } from '../../data/models/pages/questPageModel';

export const QuestPageContext = createContext<QuestPageModel | undefined>(undefined);

export function useQuestPageContext() {
  
  const context = useContext(QuestPageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}