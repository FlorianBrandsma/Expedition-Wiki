import { createContext, useContext } from "react";

import type { EquipmentSetPageModel } from '../../data/models/pages/equipmentSetPageModel';

export const EquipmentSetPageContext = createContext<EquipmentSetPageModel | undefined>(undefined);

export function useEquipmentSetPageContext() {
  
  const context = useContext(EquipmentSetPageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}