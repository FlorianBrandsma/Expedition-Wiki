import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { FactionPageContext } from './factionPageContext';

import { FactionPageModel } from '../../data/models/pages/factionPageModel';
import { FactionPageParameters } from '../../data/parameters/pages/factionPageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';
import FactionPropertyCard from './factionPropertyCard';
import FactionMemberSegment from './segments/factionMemberSegment';
import FactionStandingSegment from './segments/factionStandingSegment';
import FactionAttitudeSegment from './segments/factionAttitudeSegment';
import FactionSourceEffectSegment from './segments/factionSourceEffectSegment';
import FactionSourceEventSegment from './segments/factionSourceEventSegment';

export default function FactionPage() {

  const params = useParams<{ name: string }>();
  
  const factionName = params.name?.replaceAll('_', ' ');
  document.title = `${factionName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new FactionPageParameters({
    gameId:[gameModel.id],
    name: factionName
  });

  const factionPageQuery = useQuery<FactionPageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<FactionPageModel>(parameters, FactionPageModel),
    initialData: []
  });

  if (factionPageQuery.data?.length === 0) return;

  const factionPageModel = factionPageQuery.data[0];

  const { 
    factionModel,
    interactableModelList,
    factionStandingModelList,
    friendlyFactionModelList,
    hostileFactionModelList,
    standingStatusEffectModelList,
    reputationEventModelList
  } = factionPageModel;

  if (interactableModelList.length > 0) {
    contentSegments.push({
      label: 'Members',
      id: 'Members',
      component: <FactionMemberSegment />
    })
  }

  if (factionStandingModelList.length > 0) {
    contentSegments.push({
      label: 'Standing',
      id: 'Standing',
      component: <FactionStandingSegment />
    })
  }

  const attitudeSegment = {
    label: 'Attitude',
    id: 'Attitude',
    children: []
  } as ContentSegment;

  if (friendlyFactionModelList.length > 0) {
    attitudeSegment.children!.push({
      label: 'Friendly',
      id: 'Friendly',
      component: <FactionAttitudeSegment factionModelList={friendlyFactionModelList} />
    })
  }

  if (hostileFactionModelList.length > 0) {
    attitudeSegment.children!.push({
      label: 'Hostile',
      id: 'Hostile',
      component: <FactionAttitudeSegment factionModelList={hostileFactionModelList} />
    })
  }

  if (attitudeSegment.children?.length !== 0)
    contentSegments.push(attitudeSegment);

  const sourceSegment = {
    label: 'Source',
    id: 'Source',
    children: []
  } as ContentSegment;

  if (standingStatusEffectModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Effects',
      id: 'Effects',
      component: <FactionSourceEffectSegment />
    })
  }

  if (reputationEventModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Events',
      id: 'Events',
      component: <FactionSourceEventSegment />
    })
  }

  if (sourceSegment.children?.length !== 0)
    contentSegments.push(sourceSegment);

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <FactionPageContext.Provider value={ factionPageModel }>
          <Typography variant="h5">{factionModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <FactionPropertyCard />

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </FactionPageContext.Provider>
      </Box>
    </Box>
  )
}