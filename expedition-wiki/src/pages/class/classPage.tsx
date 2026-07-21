import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { ClassContext } from './classContext';

import { ClassModel } from '../../data/models/classModel';
import { ClassParameters } from '../../data/parameters/classParameters';
import { getData } from '../../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

export default function ClassPage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const parameters = new ClassParameters({
    includeDependencies: true,
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const classQuery = useQuery<ClassModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<ClassModel>(parameters, ClassModel),
    initialData: []
  });

  const classModel = classQuery.data[0];

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
      { !classModel ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <ClassContext.Provider value={ classModel }>
          <Typography variant="h5">{classModel.name}</Typography>
          <Divider/>
        </ClassContext.Provider>
      )}
      </Box>
    </Box>
  )
}