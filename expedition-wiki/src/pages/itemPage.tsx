import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../context/gameContext';

import { ItemModel } from '../data/models/itemModel';
import { ItemParameters } from '../data/parameters/itemParameters';
import { getData } from '../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

import ModelCard from '../features/modelViewer/components/modelCard';

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

  const itemModel = itemQuery.data[0];

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
      { !itemModel ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <>
          <Typography variant="h5">{itemModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <ModelCard 
              name={itemModel.name}
              assetType={itemModel.assetType}
              assetResourceName={itemModel.assetResourceName}
            />
            <Typography variant="body1">{itemModel.description}</Typography>
          </Box>
        </>
      )}
      </Box>
    </Box>
  )
}