import { createContext, useContext } from "react";

import type { GameModel } from '../data/models/gameModel';

interface GameContextType {
  gameModel: GameModel;
  setGameModel: React.Dispatch<React.SetStateAction<GameModel>>;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGameContext() {
  
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}