import { createContext, useContext } from "react";

import type { ItemModel } from '../../data/models/itemModel';

export const ItemContext = createContext<ItemModel | undefined>(undefined);

export function useItemContext() {
  
  const context = useContext(ItemContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}