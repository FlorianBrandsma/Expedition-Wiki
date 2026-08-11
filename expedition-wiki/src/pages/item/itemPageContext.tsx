import { createContext, useContext } from "react";

import type { ItemPageModel } from '../../data/models/pages/itemPageModel';

export const ItemPageContext = createContext<ItemPageModel | undefined>(undefined);

export function useItemPageContext() {
  
  const context = useContext(ItemPageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}