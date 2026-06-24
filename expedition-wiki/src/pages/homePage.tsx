import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

import { GameContext } from '../context/gameContext';

import type { Game } from '../data/types/types';
import { GameParameters } from '../data/parameters/parameters';
import { getData } from '../services/dataManager';

import Paper from '@mui/material/Paper';
import AppHeader from '../features/header/components/appHeader';

export default function HomePage() {
  
  const params = useParams<{ gameName: string }>();

  const navigate = useNavigate();

  const [game, setGame] = useState<Game>({ id: 0, name: "" });

  /* Get game based on parameter name. Results in navigation to the first game when no parameter name is provided */
  const parameters = new GameParameters({
    releaseCandidateId: [0],
    releaseId:[0],

    name: params.gameName?.replaceAll('_', ' ')
  });

  const gameQuery = useQuery<Game[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<Game>(parameters)
  });

  /* Set game if the first result's id does not match that of the stored game */
  if (gameQuery.data && game.id != gameQuery.data[0].id) {
      setGame(gameQuery.data[0]); 
  }

  useEffect(() => {

    /* Navigate to the selected game if the stored game's name differs from the parameter name */
    if (game.name == params.gameName) return;

    /* Prioritize parameter name over state name */
    const name = params.gameName ?? game.name;

    navigate(`/${ name }`, {
      mask:`/${ name.replaceAll(' ', '_') }`
    })
    
  }, [game])

	return (
		<GameContext.Provider value={{ game, setGame }}>
      <AppHeader/>
      <Paper square={true} sx={{
        margin: '0px 50px 5px 50px',
        padding: '25px',
        backgroundColor: 'primary.main'
      }}>
        <Outlet />
      </Paper>
    </GameContext.Provider>
	)
}