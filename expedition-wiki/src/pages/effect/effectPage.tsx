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
import EffectSourceEffectClusterSegment from './segments/effectSourceEffectClusterSegment';
import EffectSourceEffectAbilitySegment from './segments/effectSourceEffectAbilitySegment';
import EffectSourceSetSegment from './segments/effectSourceSetSegment';
import EffectSourceAgentDefaultSegment from './segments/effectSourceAgentDefaultSegment';
import EffectSourceClimateSegment from './segments/effectSourceClimateSegment';
import EffectSourceEventSegment from './segments/effectSourceEventSegment';
import EffectEventSegment from './segments/effectEventSegment';
import EffectRepeatSegment from './segments/effectRepeatSegment';
import EffectAbsorbSegment from './segments/effectAbsorbSegment';
import EffectSourceAbilitySegment from './segments/effectSourceAbilitySegment';
import EffectSourceEffectAbsorbSegment from './segments/effectSourceEffectAbsorbSegment';
import EffectSourceEffectAuraSegment from './segments/effectSourceEffectAuraSegment';
import EffectSourceEffectRepeatSegment from './segments/effectSourceEffectRepeatSegment';
import GeneralUtilityConditionAbilitySegment from '../general/segments/utility/condition/generalUtilityConditionAbilitySegment';
import GeneralUtilityConditionEventSegment from '../general/segments/utility/condition/generalUtilityConditionEventSegment';
import GeneralUtilityConditionItemSegment from '../general/segments/utility/condition/generalUtilityConditionItemSegment';
import GeneralUtilityConditionLootSegment from '../general/segments/utility/condition/generalUtilityConditionLootSegment';
import GeneralUtilityConditionReactionSegment from '../general/segments/utility/condition/generalUtilityConditionReactionSegment';
import GeneralUtilityConditionTriggerSegment from '../general/segments/utility/condition/generalUtilityConditionTriggerSegment';
import EffectSourceAgentTaskSegment from './segments/effectSourceAgentTaskSegment';

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
    interactionModelList,
    absorbResourceEffectModelList,
    abilityStatusEffectModelList,
    auraStatusEffectModelList,
    repeatStatusEffectModelList,
    clusterStatusEffectModelList,
    effectEventModelList,
    caseConditionModelList
  } = effectPageModel;

  if (effectModel.resourceEffectModel?.absorbResourceEffectModel?.damageResourceEffectModel) {
    contentSegments.push({
      label: 'Absorbs',
      id: 'Absorbs',
      component: <EffectAbsorbSegment />
    });
  }

  if (effectModel.statusEffectModel?.repeatStatusEffectModel?.repeatedEffectModel) {
    contentSegments.push({
      label: 'Repeats',
      id: 'Repeats',
      component: <EffectRepeatSegment />
    });
  }

  if (eventModelList.length > 0) {
    contentSegments.push({
      label: 'Event',
      id: 'Event',
      component: <EffectEventSegment />
    });
  }

  if (statusEffectModelList.length > 0) {
    contentSegments.push({
      label: 'Cluster',
      id: 'Cluster',
      children: [
        {
          label: 'Effects',
          id: 'Effects',
          component: <EffectClusterEffectSegment />
        }
      ]
    });
  }

  if (resistStatusEffectModelList.length > 0) {
    contentSegments.push({
      label: 'Resistance',
      id: 'Resistance',
      component: <EffectResistanceSegment />
    });
  }

  const utilitySegment = {
    label: 'Utility',
    id: 'Utility',
    children: []
  } as ContentSegment;

  if (caseConditionModelList.length > 0) {

    const conditionSegment = {
      label: 'Conditions',
      id: 'Conditions',
      children: []
    } as ContentSegment;

    /* Abilities */
    const chargeAbilityCaseConditionModelList = caseConditionModelList.filter(x => x.chargeAbilityModel);

    if (chargeAbilityCaseConditionModelList.length > 0) {

      conditionSegment.children!.push({
        label: 'Abilities',
        id: 'Abilities',
        component: <GeneralUtilityConditionAbilitySegment caseConditionModelList={chargeAbilityCaseConditionModelList} />
      });
    }

    /* Reactions */
    const agentInteractableReactionCaseConditionModelList = caseConditionModelList.filter(x => x.agentInteractableReactionModel);

    if (agentInteractableReactionCaseConditionModelList.length > 0) {

      conditionSegment.children!.push({
        label: 'Reactions',
        id: 'Reactions',
        component: <GeneralUtilityConditionReactionSegment caseConditionModelList={agentInteractableReactionCaseConditionModelList} />
      });
    }
    
    /* Loot */
    const agentInteractableLootTableCaseConditionModelList = caseConditionModelList.filter(x => x.agentInteractableLootTableModel);

    if (agentInteractableLootTableCaseConditionModelList.length > 0) {

      conditionSegment.children!.push({
        label: 'Loot',
        id: 'Loot',
        component: <GeneralUtilityConditionLootSegment caseConditionModelList={agentInteractableLootTableCaseConditionModelList} />
      });
    }

    /* Triggers */
    const interactionTriggerCaseConditionModelList = caseConditionModelList.filter(x => x.interactionTriggerModel);

    if (interactionTriggerCaseConditionModelList.length > 0) {

      conditionSegment.children!.push({
        label: 'Triggers',
        id: 'Triggers',
        component: <GeneralUtilityConditionTriggerSegment caseConditionModelList={interactionTriggerCaseConditionModelList} />
      });
    }

    /* Events */
    const eventContinuationCaseConditionModelList = caseConditionModelList.filter(x => x.eventContinuationModel);

    if (eventContinuationCaseConditionModelList.length > 0) {

      conditionSegment.children!.push({
        label: 'Events',
        id: 'Events',
        component: <GeneralUtilityConditionEventSegment caseConditionModelList={eventContinuationCaseConditionModelList} />
      });
    }

    /* Items */
    const itemEventItemCaseConditionModelList = caseConditionModelList.filter(x => x.itemEventItemModel);

    if (itemEventItemCaseConditionModelList.length > 0) {

      conditionSegment.children!.push({
        label: 'Items',
        id: 'Events',
        component: <GeneralUtilityConditionItemSegment caseConditionModelList={itemEventItemCaseConditionModelList} />
      });
    }

    if (conditionSegment.children?.length !== 0)
      utilitySegment.children!.push(conditionSegment);
  }

  if (utilitySegment.children?.length !== 0)
    contentSegments.push(utilitySegment);

  const sourceSegment = {
    label: 'Source',
    id: 'Source',
    children: []
  } as ContentSegment;

  const effectSegment = {
    label: 'Effects',
    id: 'Effects',
    children: []
  } as ContentSegment;

  if (absorbResourceEffectModelList.length > 0) {
    effectSegment.children!.push({
      label: 'Absorb',
      id: 'Absorb',
      component: <EffectSourceEffectAbsorbSegment />
    });
  }
  
  if (abilityStatusEffectModelList.length > 0) {
    effectSegment.children!.push({
      label: 'Ability',
      id: 'Ability',
      component: <EffectSourceEffectAbilitySegment />
    });
  }

  if (auraStatusEffectModelList.length > 0) {
    effectSegment.children!.push({
      label: 'Aura',
      id: 'Aura',
      component: <EffectSourceEffectAuraSegment />
    });
  }

  if (repeatStatusEffectModelList.length > 0) {
    effectSegment.children!.push({
      label: 'Repeat',
      id: 'Repeat',
      component: <EffectSourceEffectRepeatSegment />
    });
  }

  if (clusterStatusEffectModelList.length > 0) {
    effectSegment.children!.push({
      label: 'Cluster',
      id: 'Cluster',
      component: <EffectSourceEffectClusterSegment />
    });
  }

  if (effectSegment.children?.length !== 0)
    sourceSegment.children!.push(effectSegment);

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

  const agentSegment = {
    label: 'Agents',
    id: 'Agents',
    children: []
  } as ContentSegment;

  if (agentInteractableModelList.length > 0) {
    agentSegment.children!.push({
      label: 'Default',
      id: 'Default',
      component: <EffectSourceAgentDefaultSegment />
    });
  }

  if (interactionModelList.length > 0) {
    agentSegment.children!.push({
      label: 'Tasks',
      id: 'Tasks',
      component: <EffectSourceAgentTaskSegment />
    });
  }

  if (agentSegment.children?.length !== 0)
    sourceSegment.children!.push(agentSegment);

  if (atmosphereModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Climates',
      id: 'Climates',
      component: <EffectSourceClimateSegment />
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
            <Typography variant="body1" component='div'>
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