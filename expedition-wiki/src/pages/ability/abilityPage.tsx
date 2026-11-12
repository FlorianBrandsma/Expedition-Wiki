import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { AbilityPageContext } from './abilityPageContext';

import { AbilityPageModel } from '../../data/models/pages/abilityPageModel';
import { AbilityPageParameters } from '../../data/parameters/pages/abilityPageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';

import { Box, Typography } from '@mui/material';

import PageHeader from '../general/components/pageHeader';
import PageDataNotFound from '../general/components/pageDataNotFound';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';

import AbilityPropertyCard from './abilityPropertyCard';

import AbilityEffectSegment from './segments/abilityEffectSegment';
import AbilityChargeConditionSegment from './segments/abilityChargeConditionSegment';
import AbilityClassSegment from './segments/abilityClassSegment';
import AbilitySourceEventSegment from './segments/abilitySourceEventSegment';
import AbilitySourceCharacterSegment from './segments/abilitSourceCharacterSegment';
import AbilitySourceArmSegment from './segments/abilitSourceArmSegment';
import AbilitySourceSupplySegment from './segments/abilitySourceSupplySegment';

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
    queryFn: () => getData<AbilityPageModel>(parameters, AbilityPageModel)
  });

  if (gameModel.id === 0 || abilityPageQuery.isPending || abilityPageQuery.isError) return;

  if (abilityPageQuery.data.length === 0) return (
    <PageDataNotFound />
  );

  const abilityPageModel = abilityPageQuery.data[0];

  const { 
    abilityModel,
    classModelList,
    supplyItemModelList,
    armEquipmentItemModelList,
    characterAgentInteractableModelList,
    abilityEventModelList
  } = abilityPageModel;

  if (abilityModel.effectModelList.length > 0) {

    contentSegments.push({
      label: 'Effects',
      id: 'Effects',
      component: <AbilityEffectSegment />
    });
  }
  
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
      children: [{
        label: 'Conditions',
        id: 'Charge/Conditions',
        component: <AbilityChargeConditionSegment />
      }]
    });
  }

  const sourceSegment = {
    label: 'Source',
    id: 'Source',
    children: []
  } as ContentSegment;

  if (supplyItemModelList.length > 0) {
    
    sourceSegment.children!.push({
      label: 'Supplies',
      id: `${sourceSegment.id}/Supplies`,
      component: <AbilitySourceSupplySegment />
    });
  }

  if (armEquipmentItemModelList.length > 0) {
    
    sourceSegment.children!.push({
      label: 'Arms',
      id: `${sourceSegment.id}/Arms`,
      component: <AbilitySourceArmSegment />
    });
  }

  if (characterAgentInteractableModelList.length > 0) {
    
    sourceSegment.children!.push({
      label: 'Characters',
      id: `${sourceSegment.id}/Characters`,
      component: <AbilitySourceCharacterSegment />
    });
  }

  if (abilityEventModelList.length > 0) {
    
    sourceSegment.children!.push({
      label: 'Events',
      id: `${sourceSegment.id}/Events`,
      component: <AbilitySourceEventSegment />
    });
  }

  if (sourceSegment.children?.length !== 0)
    contentSegments.push(sourceSegment);

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <AbilityPageContext.Provider value={ abilityPageModel }>

          <PageHeader 
            primaryName={abilityModel.name} 
            secondaryName='Ability' 
          />
          
          <Box sx={{ mt: 1 }}>
            <AbilityPropertyCard />

            <Box sx={{
              maxWidth: (theme) => `calc(50% - ${theme.spacing(1)})`
            }}>
              <Typography 
                variant="body1" 
                sx={{ mb: 1 }}
              >
                {abilityModel.description}
              </Typography>

              {contentSegments.length > 0 && (
                <ContentTable segments={contentSegments} />
              )}
            </Box>

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </AbilityPageContext.Provider>
      </Box>
    </Box>
  )
}