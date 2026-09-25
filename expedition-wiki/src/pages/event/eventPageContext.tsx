import { createContext, useContext } from "react";

import type { EventPageModel } from '../../data/models/pages/eventPageModel';

export const EventPageContext = createContext<EventPageModel | undefined>(undefined);

export function useEventPageContext() {
  
  const context = useContext(EventPageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}