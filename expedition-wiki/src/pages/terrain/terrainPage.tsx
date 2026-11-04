import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { TerrainPageContext } from './terrainPageContext';

import { TerrainPageModel } from '../../data/models/pages/terrainPageModel';
import { TerrainPageParameters } from '../../data/parameters/pages/terrainPageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';

import { Box } from '@mui/material';

import PageHeader from '../general/components/pageHeader';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';

import TerrainPropertyCard from './terrainPropertyCard';

import TerrainClimateSegment from './segments/terrainClimateSegment';
import TerrainInteractableSegment from './segments/terrainInteractableSegment';
import TerrainTransportSegment from './segments/terrainTransportSegment';

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
    worldInteractableModelList,
    transportEventModelList
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

  if (transportEventModelList.length > 0) {
    contentSegments.push({
      label: 'Transport',
      id: 'Transport',
      component: <TerrainTransportSegment />
    })
  }

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <TerrainPageContext.Provider value={ terrainPageModel }>

          <PageHeader 
            primaryName={terrainModel.name} 
            secondaryName='Terrain' 
          />

          <Box sx={{ mt: 1 }}>
            <TerrainPropertyCard />

            <Box sx={{
              maxWidth: (theme) => `calc(50% - ${theme.spacing(1)})`
            }}>
              {contentSegments.length > 0 && (
                <ContentTable segments={contentSegments} />
              )}
            </Box>

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </TerrainPageContext.Provider>
      </Box>
    </Box>
  )
}