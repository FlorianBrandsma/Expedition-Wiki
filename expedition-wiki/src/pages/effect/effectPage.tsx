import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { EffectPageContext } from './effectPageContext';

import { EffectPageModel } from '../../data/models/pages/effectPageModel';
import { EffectPageParameters } from '../../data/parameters/pages/effectPageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import EffectPropertyCard from './effectPropertyCard';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';
import EffectClusterEffectSegment from './segments/effectClusterEffectSegment';
import EffectResistanceSegment from './segments/effectResistanceSegment';
import EffectSourceEquipmentSegment from './segments/effectSourceEquipment';
import EffectSourceClusterSegment from './segments/effectSourceClusterSegment';
import EffectSourceAbilitySegment from './segments/effectSourceAbilitySegment';
import EffectSourceSetSegment from './segments/effectSourceSetSegment';
import EffectSourceAgentSegment from './segments/effectSourceAgentSegment';
import EffectSourceAtmosphereSegment from './segments/effectSourceAtmosphereSegment';
import EffectSourceEventSegment from './segments/effectSourceEventSegment';
import EffectEventSegment from './segments/effectEventSegment';

export default function EffectPage() {

  const params = useParams<{ name: string }>();
  
  const effectName = params.name?.replaceAll('_', ' ');
  document.title = `${effectName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new EffectPageParameters({
    gameId:[gameModel.id],
    name: effectName
  });

  const effectPageQuery = useQuery<EffectPageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<EffectPageModel>(parameters, EffectPageModel),
    initialData: []
  });

  if (effectPageQuery.data?.length === 0) return;

  const effectPageModel = effectPageQuery.data[0];

  const { 
    effectModel,
    eventModelList,
    statusEffectModelList,
    resistStatusEffectModelList,
    abilityModelList,
    equipmentItemModelList,
    equipmentSetModelList,
    agentInteractableModelList,
    atmosphereModelList,
    clusterStatusEffectModelList,
    effectEventModelList
  } = effectPageModel;

  if (eventModelList.length > 0) {
  
    const eventSegment = {
      label: 'Event',
      id: 'Event',
      component: <EffectEventSegment />
    } as ContentSegment;

    contentSegments.push(eventSegment);
  }

  if (statusEffectModelList.length > 0) {

    const clusterSegment = {
      label: 'Cluster',
      id: 'Cluster',
      children: [
        {
          label: 'Effects',
          id: 'Effects',
          component: <EffectClusterEffectSegment />
        }
      ]
    } as ContentSegment;

    contentSegments.push(clusterSegment);
  }

  if (resistStatusEffectModelList.length > 0) {
  
    const resistanceSegment = {
      label: 'Resistance',
      id: 'Resistance',
      component: <EffectResistanceSegment />
    } as ContentSegment;

    contentSegments.push(resistanceSegment);
  }

  const sourceSegment = {
    label: 'Source',
    id: 'Source',
    children: []
  } as ContentSegment;

  if (abilityModelList.length > 0) {
  
    sourceSegment.children!.push({
      label: 'Abilities',
      id: 'Abilities',
      component: <EffectSourceAbilitySegment />
    });
  }

  if (equipmentItemModelList.length > 0) {
  
    sourceSegment.children!.push({
      label: 'Equipment',
      id: 'Equipment',
      component: <EffectSourceEquipmentSegment />
    });
  }

  if (equipmentSetModelList.length > 0) {
  
    sourceSegment.children!.push({
      label: 'Sets',
      id: 'Sets',
      component: <EffectSourceSetSegment />
    });
  }

  if (agentInteractableModelList.length > 0) {
  
    sourceSegment.children!.push({
      label: 'Agents',
      id: 'Agents',
      component: <EffectSourceAgentSegment />
    });
  }

  if (atmosphereModelList.length > 0) {
  
    sourceSegment.children!.push({
      label: 'Atmospheres',
      id: 'Atmospheres',
      component: <EffectSourceAtmosphereSegment />
    });
  }

  if (clusterStatusEffectModelList.length > 0) {
  
    sourceSegment.children!.push({
      label: 'Clusters',
      id: 'Clusters',
      component: <EffectSourceClusterSegment />
    });
  }

  if (effectEventModelList.length > 0) {
  
    sourceSegment.children!.push({
      label: 'Events',
      id: 'Events',
      component: <EffectSourceEventSegment />
    });
  }
  
  if (sourceSegment.children?.length !== 0)
    contentSegments.push(sourceSegment);

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <EffectPageContext.Provider value={ effectPageModel }>
          <Typography variant="h5">{effectModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <EffectPropertyCard />
            <Typography variant="body1">
              {effectModel.descriptionComponent()}
            </Typography>

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </EffectPageContext.Provider>
      </Box>
    </Box>
  )
}