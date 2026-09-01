import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { InteractablePageContext } from './interactablePageContext';

import { InteractablePageModel } from '../../data/models/pages/interactablePageModel';
import { InteractablePageParameters } from '../../data/parameters/pages/interactablePageParameters';
import { getData } from '../../services/dataManager';

import { Divider, Box, Typography } from '@mui/material';

import InteractablePropertyCard from './interactablePropertyCard';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import InteractableEffectSegment from './segments/interactableEffectSegment';
import GeneralUtilityConditionAbilitySegment from '../general/segments/utility/condition/generalUtilityConditionAbilitySegment';
import GeneralUtilityConditionReactionSegment from '../general/segments/utility/condition/generalUtilityConditionReactionSegment';
import GeneralUtilityConditionLootSegment from '../general/segments/utility/condition/generalUtilityConditionLootSegment';
import GeneralUtilityConditionTriggerSegment from '../general/segments/utility/condition/generalUtilityConditionTriggerSegment';
import GeneralUtilityConditionEventSegment from '../general/segments/utility/condition/generalUtilityConditionEventSegment';
import GeneralUtilityConditionItemSegment from '../general/segments/utility/condition/generalUtilityConditionItemSegment';
import InteractableEquipmentSegment from './segments/interactableEquipmentSegment';
import InteractableAbilitySegment from './segments/interactableAbilitySegment';
import InteractableNoteSegment from './segments/interactableNoteSegment';
import InteractableBehaviourSegment from './segments/interactableBehaviourSegment';
import InteractableReactionSegment from './segments/interactableReactionSegment';
import InteractableLootTableConditionSegment from './segments/interactableLootTableConditionSegment';
import InteractableLootTableItemSegment from './segments/interactableLootTableItemSegment';
import InteractableSourceEventSegment from './segments/interactableSourceEventSegment';

export default function InteractablePage() {

  const params = useParams<{ name: string }>();
  
  const interactableName = params.name?.replaceAll('_', ' ');
  document.title = `${interactableName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];

  const parameters = new InteractablePageParameters({
    gameId:[gameModel.id],
    name: interactableName
  });

  const interactablePageQuery = useQuery<InteractablePageModel[]>({
    queryKey: ['parameters', parameters],
    queryFn: () => getData<InteractablePageModel>(parameters, InteractablePageModel),
    initialData: []
  });

  if (interactablePageQuery.data?.length === 0) return;

  const interactablePageModel = interactablePageQuery.data[0];
  
  const { 
    interactableModel,
    noteModelList,
    agentInteractableBehaviourModelList,
    agentInteractableReactionModelList,
    agentInteractableLootTableModelList,
    statusEffectModelList,
    equipmentItemModelList,
    dischargeAbilityModelList,
    caseConditionModelList,
    companionEventModelList
  } = interactablePageModel;

  if (noteModelList.length > 0) {
    contentSegments!.push({
      label: 'Notes',
      id: 'Notes',
      component: <InteractableNoteSegment />
    });
  }

  if (equipmentItemModelList.length > 0) {
    contentSegments!.push({
      label: 'Equipment',
      id: 'Equipment',
      component: <InteractableEquipmentSegment />
    });
  }

  if (statusEffectModelList.length > 0) {
    contentSegments!.push({
      label: 'Effects',
      id: 'Effects',
      component: <InteractableEffectSegment />
    });
  }

  if (dischargeAbilityModelList.length > 0) {
    contentSegments!.push({
      label: 'Abilities',
      id: 'Abilities',
      component: <InteractableAbilitySegment />
    });
  }

  if (agentInteractableBehaviourModelList.length > 0) {
    contentSegments!.push({
      label: 'Behaviour',
      id: 'Behaviour',
      component: <InteractableBehaviourSegment />
    });
  }

  if (agentInteractableReactionModelList.length > 0) {
    contentSegments!.push({
      label: 'Reactions',
      id: 'Reactions',
      component: <InteractableReactionSegment />
    });
  }

  if (agentInteractableLootTableModelList.length > 0) {

    contentSegments!.push({
      label: 'Loot',
      id: 'Loot',
      children: agentInteractableLootTableModelList.map(agentInteractableLootTableModel => {

        const children: ContentSegment[] = [];

        if (agentInteractableLootTableModel.caseConditionModelList.length > 0) {

          children.push({
            label: 'Conditions',
            id: 'Conditions',
            component: <InteractableLootTableConditionSegment caseConditionModelList={agentInteractableLootTableModel.caseConditionModelList} />
          })
        }

        if (agentInteractableLootTableModel.itemModelList.length > 0) {

          children.push({
            label: 'Items',
            id: 'Items',
            component: <InteractableLootTableItemSegment itemModelList={agentInteractableLootTableModel.itemModelList}/>
          })
        }

        return {
          label: agentInteractableLootTableModel.name,
          id: agentInteractableLootTableModel.name,
          component: <></>,
          children: children
        } as ContentSegment;
      })  
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

  if (companionEventModelList.length > 0) {
    
    sourceSegment.children!.push({
      label: 'Events',
      id: 'Events',
      component: <InteractableSourceEventSegment />
    });
  }

  if (sourceSegment.children?.length !== 0)
    contentSegments.push(sourceSegment);

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <InteractablePageContext.Provider value={ interactablePageModel }>
          <Typography variant="h5">{interactableModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <InteractablePropertyCard />

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </InteractablePageContext.Provider>
      </Box>
    </Box>
  )
}