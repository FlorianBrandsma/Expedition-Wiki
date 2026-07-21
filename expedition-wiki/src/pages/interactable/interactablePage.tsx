import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { InteractableContext } from './interactableContext';

import { InteractableModel } from '../../data/models/interactableModel';
import { InteractableParameters } from '../../data/parameters/interactableParameters';
import { getData } from '../../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

export default function InteractablePage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const parameters = new InteractableParameters({
    includeDependencies: true,
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const interactableQuery = useQuery<InteractableModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<InteractableModel>(parameters, InteractableModel),
    initialData: []
  });

  const interactableModel = interactableQuery.data[0];

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
      { !interactableModel ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <InteractableContext.Provider value={ interactableModel }>
          <Typography variant="h5">{interactableModel.name}</Typography>
          <Divider/>
        </InteractableContext.Provider>
      )}
      </Box>
    </Box>
  )
}