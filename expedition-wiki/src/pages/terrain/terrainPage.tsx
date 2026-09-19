import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { TerrainPageContext } from './terrainPageContext';

import { TerrainPageModel } from '../../data/models/pages/terrainPageModel';
import { TerrainPageParameters } from '../../data/parameters/pages/terrainPageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';
import TerrainPropertyCard from './terrainPropertyCard';
import TerrainClimateSegment from './segments/terrainClimateSegment';
import TerrainInteractableSegment from './segments/terrainInteractableSegment';

export default function TerrainPage() {

  const params = useParams<{ regionName: string, terrainName: string }>();
  
  const regionName  = params.regionName ?.replaceAll('_', ' ');
  const terrainName = params.terrainName?.replaceAll('_', ' ');
  document.title = `${terrainName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new TerrainPageParameters({
    gameId:[gameModel.id],
    terrainName: terrainName,
    regionName: regionName
  });

  const terrainPageQuery = useQuery<TerrainPageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<TerrainPageModel>(parameters, TerrainPageModel),
    initialData: []
  });

  if (terrainPageQuery.data?.length === 0) return;

  const terrainPageModel = terrainPageQuery.data[0];

  const { 
    terrainModel,
    worldInteractableModelList
  } = terrainPageModel;

  contentSegments.push({
    label: 'Climates',
    id: 'Climates',
    component: <TerrainClimateSegment />
  })

  if (worldInteractableModelList.length > 0) {
    contentSegments.push({
      label: 'Interactables',
      id: 'Interactables',
      component: <TerrainInteractableSegment />
    })
  }

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <TerrainPageContext.Provider value={ terrainPageModel }>
          <Typography variant="h5">{terrainModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <TerrainPropertyCard />

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </TerrainPageContext.Provider>
      </Box>
    </Box>
  )
}