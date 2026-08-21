import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { EquipmentSetPageContext } from './equipmentSetPageContext';

import { EquipmentSetPageModel } from '../../data/models/pages/equipmentSetPageModel';
import { EquipmentSetPageParameters } from '../../data/parameters/pages/equipmentSetPageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';
import EquipmentSetEquipmentSegment from './segments/equipmentSetEquipmentSegment';
import EquipmentSetEffectSegment from './segments/equipmentSetEffectSegment';

export default function EquipmentSetPage() {

  const params = useParams<{ name: string }>();
  
  const equipmentSetName = params.name?.replaceAll('_', ' ');
  document.title = `${equipmentSetName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new EquipmentSetPageParameters({
    gameId:[gameModel.id],
    name: equipmentSetName
  });

  const equipmentSetPageQuery = useQuery<EquipmentSetPageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<EquipmentSetPageModel>(parameters, EquipmentSetPageModel),
    initialData: []
  });

  if (equipmentSetPageQuery.data?.length === 0) return;

  const equipmentSetPageModel = equipmentSetPageQuery.data[0];

  const { 
    equipmentSetModel: equipmentSetModel,
    statusEffectModelList
  } = equipmentSetPageModel;

  contentSegments.push({
    label: 'Equipment',
    id: 'Equipment',
    component: <EquipmentSetEquipmentSegment />
  })
  
  if (statusEffectModelList.length > 0) {
    contentSegments.push({
      label: 'Effects',
      id: 'Effects',
      component: <EquipmentSetEffectSegment />
    })
  }

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <EquipmentSetPageContext.Provider value={ equipmentSetPageModel }>
          <Typography variant="h5">{equipmentSetModel.name}</Typography>
          <Divider/>
          <Box>

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </EquipmentSetPageContext.Provider>
      </Box>
    </Box>
  )
}