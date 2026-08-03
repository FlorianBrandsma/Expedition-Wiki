import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { EquipmentSetContext } from './equipmentSetContext';

import { EquipmentSetModel } from '../../data/models/equipmentSetModel';
import { EquipmentSetParameters } from '../../data/parameters/equipmentSetParameters';
import { getData } from '../../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

export default function EquipmentSetPage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const parameters = new EquipmentSetParameters({
    includeDependencies: true,
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const equipmentSetQuery = useQuery<EquipmentSetModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<EquipmentSetModel>(parameters, EquipmentSetModel),
    initialData: []
  });

  const equipmentSetModel = equipmentSetQuery.data[0];

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
      { !equipmentSetModel ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <EquipmentSetContext.Provider value={ equipmentSetModel }>
          <Typography variant="h5">{equipmentSetModel.name}</Typography>
          <Divider/>
        </EquipmentSetContext.Provider>
      )}
      </Box>
    </Box>
  )
}