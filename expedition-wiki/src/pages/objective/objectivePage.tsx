import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { ObjectivePageContext } from './objectivePageContext';

import { ObjectivePageModel } from '../../data/models/pages/objectivePageModel';
import { ObjectivePageParameters } from '../../data/parameters/pages/objectivePageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';

import ObjectivePropertyCard from './objectivePropertyCard';
import ObjectiveInteractableSegment from './segments/objectiveInteractableSegment';

export default function ObjectivePage() {

  const params = useParams<{ questName: string, objectiveName: string }>();
    
  const questName     = params.questName    ?.replaceAll('_', ' ');
  const objectiveName = params.objectiveName?.replaceAll('_', ' ');
  document.title = `${objectiveName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new ObjectivePageParameters({
    gameId:        [gameModel.id],
    objectiveName: objectiveName,
    questName:     questName
  });

  const objectivePageQuery = useQuery<ObjectivePageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<ObjectivePageModel>(parameters, ObjectivePageModel),
    initialData: []
  });

  if (objectivePageQuery.data?.length === 0) return;

  const objectivePageModel = objectivePageQuery.data[0];

  const { 
    objectiveModel,
    worldInteractableModelList
  } = objectivePageModel;

  if (worldInteractableModelList.length > 0) {
    contentSegments.push({
      label: 'Interactables',
      id: 'Interactables',
      component: <ObjectiveInteractableSegment />
    });
  } 

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <ObjectivePageContext.Provider value={ objectivePageModel }>
          <Typography variant="h5">{objectiveModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <ObjectivePropertyCard />
            <Typography variant="body1">{objectiveModel.descriptionComponent}</Typography>

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </ObjectivePageContext.Provider>
      </Box>
    </Box>
  )
}