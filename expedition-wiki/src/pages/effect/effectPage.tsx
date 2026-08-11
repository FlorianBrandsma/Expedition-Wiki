import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { EffectContext } from './effectContext';

import { EffectModel } from '../../data/models/effectModel';
import { EffectParameters } from '../../data/parameters/effectParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import EffectPropertyCard from './effectPropertyCard';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';

export default function EffectPage() {

  const params = useParams<{ name: string }>();
  
  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];

  const parameters = new EffectParameters({
    includeDependencies: true,
    gameId:[gameModel.id],
    name: params.name?.replaceAll('_', ' ')
  });

  const effectQuery = useQuery<EffectModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<EffectModel>(parameters, EffectModel),
    initialData: []
  });

  const effectModel = effectQuery.data[0];

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
      { !effectModel ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <EffectContext.Provider value={ effectModel }>
          <Typography variant="h5">{effectModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <EffectPropertyCard />
            <Typography variant="body1">
              {effectModel.descriptionComponent(1)}
            </Typography>

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </EffectContext.Provider>
      )}
      </Box>
    </Box>
  )
}