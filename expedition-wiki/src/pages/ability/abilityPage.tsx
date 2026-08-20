import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { AbilityPageContext } from './abilityPageContext';

import { AbilityPageModel } from '../../data/models/pages/abilityPageModel';
import { AbilityPageParameters } from '../../data/parameters/pages/abilityPageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import AbilityPropertyCard from './abilityPropertyCard';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';
import AbilityEffectSegment from './segments/abilityEffectSegment';
import AbilityChargeConditionSegment from './segments/abilityChargeConditionSegment';
import AbilityClassSegment from './segments/abilityClassSegment';
import AbilitySourceEventSegment from './segments/abilitySourceEventSegment';
import AbilitySourceCharacterSegment from './segments/abilitSourceCharacterSegment';
import AbilitySourceArmSegment from './segments/abilitSourceArmSegment';

export default function AbilityPage() {

  const params = useParams<{ name: string }>();
  
  const abilityName = params.name?.replaceAll('_', ' ');
  document.title = `${abilityName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new AbilityPageParameters({
    gameId:[gameModel.id],
    name: abilityName
  });

  const abilityPageQuery = useQuery<AbilityPageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<AbilityPageModel>(parameters, AbilityPageModel),
    initialData: []
  });

  if (abilityPageQuery.data?.length === 0) return;

  const abilityPageModel = abilityPageQuery.data[0];

  const { 
    abilityModel,
    classModelList,
    armEquipmentItemModelList,
    characterAgentInteractableModelList,
    abilityEventModelList
  } = abilityPageModel;

  contentSegments.push({
    label: 'Effects',
    id: 'Effects',
    component: <AbilityEffectSegment />
  });

  if (classModelList.length > 0) {
    contentSegments.push({
      label: 'Classes',
      id: 'Classes',
      component: <AbilityClassSegment />
    })
  }

  if (abilityModel?.chargeAbilityModel?.caseConditionModelList.length > 0) {
  
    contentSegments.push({
      label: 'Charge',
      id: 'Charge',
      children: [
        {
          label: 'Conditions',
          id: 'Conditions',
          component: <AbilityChargeConditionSegment />
        }
      ]
    });
  }

  const sourceSegment = {
    label: 'Source',
    id: 'Source',
    children: []
  } as ContentSegment;

  if (armEquipmentItemModelList.length > 0) {
    
    sourceSegment.children!.push({
      label: 'Arms',
      id: 'Arms',
      component: <AbilitySourceArmSegment />
    });
  }

  if (characterAgentInteractableModelList.length > 0) {
    
    sourceSegment.children!.push({
      label: 'Characters',
      id: 'Characters',
      component: <AbilitySourceCharacterSegment />
    });
  }

  if (abilityEventModelList.length > 0) {
    
    sourceSegment.children!.push({
      label: 'Events',
      id: 'Events',
      component: <AbilitySourceEventSegment />
    });
  }

  if (sourceSegment.children?.length !== 0)
    contentSegments.push(sourceSegment);

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <AbilityPageContext.Provider value={ abilityPageModel }>
          <Typography variant="h5">{abilityModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <AbilityPropertyCard />
            <Typography variant="body1">
              {abilityModel.description}
            </Typography>

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </AbilityPageContext.Provider>
      </Box>
    </Box>
  )
}