import { createContext, useContext } from "react";

import type { EquipmentSetModel } from '../../data/models/equipmentSetModel';

export const EquipmentSetContext = createContext<EquipmentSetModel | undefined>(undefined);

export function useEquipmentSetContext() {
  
  const context = useContext(EquipmentSetContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}