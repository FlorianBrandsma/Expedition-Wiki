import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { ItemContext } from './itemContext';

import { ItemModel } from '../../data/models/itemModel';
import { ItemParameters } from '../../data/parameters/itemParameters';
import { getData } from '../../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

import ItemPropertySegment from './segments/itemPropertySegment';
import ItemEquipmentSegment from './segments/itemEquipmentSegment';

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
        <ItemContext.Provider value={ itemModel }>
          <Typography variant="h5">{itemModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <ItemPropertySegment />
            <Typography variant="body1">{itemModel.description}</Typography>
            <ItemEquipmentSegment/>
          </Box>
        </ItemContext.Provider>
      )}
      </Box>
    </Box>
  )
}