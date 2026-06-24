import { createContext, useContext } from "react";

import type { Game } from '../data/types/types';

interface GameContextType {
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGameContext() {
  
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error("Context undefined");
  }
  
  return context;
}