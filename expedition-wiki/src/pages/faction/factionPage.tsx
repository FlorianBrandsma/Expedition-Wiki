import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { FactionContext } from './factionContext';

import { FactionModel } from '../../data/models/factionModel';
import { FactionParameters } from '../../data/parameters/factionParameters';
import { getData } from '../../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

export default function FactionPage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const parameters = new FactionParameters({
    includeDependencies: true,
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const factionQuery = useQuery<FactionModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<FactionModel>(parameters, FactionModel),
    initialData: []
  });

  const factionModel = factionQuery.data[0];

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
      { !factionModel ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <FactionContext.Provider value={ factionModel }>
          <Typography variant="h5">{factionModel.name}</Typography>
          <Divider/>
        </FactionContext.Provider>
      )}
      </Box>
    </Box>
  )
}