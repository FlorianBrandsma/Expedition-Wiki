import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

import { GameContext } from '../context/gameContext';

import { GameModel } from '../data/models/gameModel';
import { GameParameters } from '../data/parameters/gameParameters';
import { getData } from '../services/dataManager';

import Paper from '@mui/material/Paper';
import AppHeader from '../features/header/components/appHeader';

export default function HomePage() {
  
  const navigate = useNavigate();
  
  const [gameModel, setGameModel] = useState<GameModel>({ id: 0, name: "" });
  
  const params = useParams<{ gameName: string }>();

  const paramsGameName = params.gameName?.replaceAll('_', ' ');

  /* Get game based on parameter name. Results in navigation to the first game when no parameter name is provided */
  const parameters = new GameParameters({
    releaseCandidateId: [0],
    releaseId:[0],

    name: paramsGameName
  });

  const gameQuery = useQuery<GameModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData(parameters, GameModel)
  });

  /* Set game if the first result's id does not match that of the stored game */
  if (gameQuery.data && gameModel.id != gameQuery.data[0].id) {
      setGameModel(gameQuery.data[0]); 
  }

  useEffect(() => {
    
    /* Navigate to the selected game if the stored game's name differs from the parameter name */
    if (gameModel.name.length == 0 || gameModel.name == paramsGameName) return;

    /* Prioritize parameter name over state name */
    const gameName = params.gameName ?? gameModel.name;

    navigate(`/${ gameName }`, {
      mask:`/${ gameName.replaceAll(' ', '_') }`
    });
  
  }, [gameModel])

	return (
		<GameContext.Provider value={{ gameModel, setGameModel }}>
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