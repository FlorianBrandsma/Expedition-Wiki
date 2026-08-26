import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { ClimatePageContext } from './climatePageContext';

import { ClimatePageModel } from '../../data/models/pages/climatePageModel';
import { ClimatePageParameters } from '../../data/parameters/pages/climatePageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';
import ClimatePropertyCard from './climatePropertyCard';
import ClimateEffectSegment from './segments/climateEffectSegment';

export default function ClimatePage() {

  const params = useParams<{ regionName: string, terrainName: string, climateName: string }>();
  
  const regionName  = params.regionName ?.replaceAll('_', ' ');
  const terrainName = params.terrainName?.replaceAll('_', ' ');
  const climateName = params.climateName?.replaceAll('_', ' ');
  document.title = `${climateName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new ClimatePageParameters({
    gameId:[gameModel.id],
    regionName: regionName,
    terrainName: terrainName,
    climateName: climateName
  });

  const climatePageQuery = useQuery<ClimatePageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<ClimatePageModel>(parameters, ClimatePageModel),
    initialData: []
  });

  if (climatePageQuery.data?.length === 0) return;

  const climatePageModel = climatePageQuery.data[0];

  const { 
    climateModel,
    statusEffectModelList
  } = climatePageModel;

  if (statusEffectModelList.length > 0) {
    contentSegments.push({
      label: 'Effects',
      id: 'Effects',
      component: <ClimateEffectSegment />
    })
  }

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <ClimatePageContext.Provider value={ climatePageModel }>
          <Typography variant="h5">{climateModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <ClimatePropertyCard />

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </ClimatePageContext.Provider>
      </Box>
    </Box>
  )
}