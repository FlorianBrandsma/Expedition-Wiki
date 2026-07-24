import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { AbilityContext } from './abilityContext';

import { AbilityModel } from '../../data/models/abilityModel';
import { AbilityParameters } from '../../data/parameters/abilityParameters';
import { getData } from '../../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

export default function AbilityPage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const parameters = new AbilityParameters({
    includeDependencies: true,
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const abilityQuery = useQuery<AbilityModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<AbilityModel>(parameters, AbilityModel),
    initialData: []
  });

  const abilityModel = abilityQuery.data[0];

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
      { !abilityModel ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <AbilityContext.Provider value={ abilityModel }>
          <Typography variant="h5">{abilityModel.name}</Typography>
          <Divider/>
        </AbilityContext.Provider>
      )}
      </Box>
    </Box>
  )
}