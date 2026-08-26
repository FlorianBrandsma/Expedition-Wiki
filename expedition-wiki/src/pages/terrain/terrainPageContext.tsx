import { createContext, useContext } from "react";

import type { TerrainPageModel } from '../../data/models/pages/terrainPageModel';

export const TerrainPageContext = createContext<TerrainPageModel | undefined>(undefined);

export function useTerrainPageContext() {
  
  const context = useContext(TerrainPageContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}