import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { EffectContext } from './effectContext';

import { EffectModel } from '../../data/models/effectModel';
import { EffectParameters } from '../../data/parameters/effectParameters';
import { getData } from '../../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

export default function EffectPage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const parameters = new EffectParameters({
    includeDependencies: true,
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const effectQuery = useQuery<EffectModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<EffectModel>(parameters, EffectModel),
    initialData: []
  });

  const effectModel = effectQuery.data[0];

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
      { !effectModel ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <EffectContext.Provider value={ effectModel }>
          <Typography variant="h5">{effectModel.name}</Typography>
          <Divider/>
        </EffectContext.Provider>
      )}
      </Box>
    </Box>
  )
}