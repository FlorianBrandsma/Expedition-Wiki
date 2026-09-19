import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { WorldInteractablePageContext } from './worldInteractablePageContext';

import { WorldInteractablePageModel } from '../../data/models/pages/worldInteractablePageModel';
import { WorldInteractablePageParameters } from '../../data/parameters/pages/worldInteractablePageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';

import WorldInteractablePropertyCard from './worldInteractablePropertyCard';
import { WorldInteractableType, WorldInteractableParentType } from '../../types/enums';
import WorldInteractableTaskSegment from './segments/worldInteractableTaskSegment';

export default function WorldInteractablePage() {

  const params = useParams<{ 
    type: WorldInteractableType, 
    parentType: WorldInteractableParentType,
    regionName: string,
    terrainName: string,
    questName: string, 
    objectiveName: string, 
    worldInteractableName: string 
  }>();

  const worldInteractableType       = WorldInteractableType      .findIndex(type => type.toLowerCase() === params.type      ?.toLowerCase());
  const worldInteractableParentType = WorldInteractableParentType.findIndex(type => type.toLowerCase() === params.parentType?.toLowerCase());
  const regionName                  = params.regionName           ?.replaceAll('_', ' ');
  const terrainName                 = params.terrainName          ?.replaceAll('_', ' ');
  const questName                   = params.questName            ?.replaceAll('_', ' ');
  const objectiveName               = params.objectiveName        ?.replaceAll('_', ' ');
  const worldInteractableName       = params.worldInteractableName?.replaceAll('_', ' ');
  document.title = `${worldInteractableName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new WorldInteractablePageParameters({
    gameId:                     [gameModel.id],
    regionName:                  regionName,
    terrainName:                 terrainName,
    questName:                   questName,
    objectiveName:               objectiveName,
    worldInteractableName:       worldInteractableName,
    worldInteractableType:       worldInteractableType,
    worldInteractableParentType: worldInteractableParentType
  });

  const worldInteractablePageQuery = useQuery<WorldInteractablePageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<WorldInteractablePageModel>(parameters, WorldInteractablePageModel),
    initialData: []
  });

  if (worldInteractablePageQuery.data?.length === 0) return;

  const worldInteractablePageModel = worldInteractablePageQuery.data[0];

  const { 
    worldInteractableModel
  } = worldInteractablePageModel;

  contentSegments.push({
    label: 'Tasks',
    id: 'Tasks',
    component: <WorldInteractableTaskSegment />
  })

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <WorldInteractablePageContext.Provider value={worldInteractablePageModel} >
          <Typography variant="h5">{worldInteractableModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <WorldInteractablePropertyCard questName={questName} objectiveName={objectiveName} />

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </WorldInteractablePageContext.Provider>
      </Box>
    </Box>
  )
}