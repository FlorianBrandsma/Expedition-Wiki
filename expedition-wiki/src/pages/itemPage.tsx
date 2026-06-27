import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../context/gameContext';

import { ItemModel } from '../data/models/itemModel';
import { ItemParameters } from '../data/parameters/itemParameters';
import { getData } from '../services/dataManager';

import { Box, Typography } from '@mui/material';

export default function ItemPage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const parameters = new ItemParameters({
    includeDependencies: true,
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const itemQuery = useQuery<ItemModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<ItemModel>(parameters, ItemModel),
    initialData: []
  });

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
      <Typography variant="h6">Item</Typography>

      { itemQuery.isLoading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <>
          <Typography variant="h5">{itemQuery.data[0]?.name}</Typography>
          <Typography variant="body1">{itemQuery.data[0]?.description}</Typography>
        </>
      )}
      </Box>
    </Box>
  )
}