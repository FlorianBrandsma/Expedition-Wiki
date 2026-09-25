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
import GeneralUtilityConditionAbilitySegment from '../general/segments/utility/condition/generalUtilityConditionAbilitySegment';
import GeneralUtilityConditionReactionSegment from '../general/segments/utility/condition/generalUtilityConditionReactionSegment';
import GeneralUtilityConditionLootSegment from '../general/segments/utility/condition/generalUtilityConditionLootSegment';
import GeneralUtilityConditionTriggerSegment from '../general/segments/utility/condition/generalUtilityConditionTriggerSegment';
import GeneralUtilityConditionEventSegment from '../general/segments/utility/condition/generalUtilityConditionEventSegment';
import GeneralUtilityConditionItemSegment from '../general/segments/utility/condition/generalUtilityConditionItemSegment';

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
    caseConditionModelList,
    standingStatusEffectModelList,
    reputationEventModelList
  } = factionPageModel;

  if (interactableModelList.length > 0) {
    contentSegments.push({
      label: 'Members',
      id: 'Members',
      component: <FactionMemberSegment />
    });
  }

  if (factionStandingModelList.length > 0) {
    contentSegments.push({
      label: 'Standing',
      id: 'Standing',
      component: <FactionStandingSegment />
    });
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
    });
  }

  if (hostileFactionModelList.length > 0) {
    attitudeSegment.children!.push({
      label: 'Hostile',
      id: 'Hostile',
      component: <FactionAttitudeSegment factionModelList={hostileFactionModelList} />
    });
  }

  if (attitudeSegment.children?.length !== 0)
    contentSegments.push(attitudeSegment);
      
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
        id: 'ConditionEvents',
        component: <GeneralUtilityConditionEventSegment caseConditionModelList={eventContinuationCaseConditionModelList} />
      });
    }

    /* Items */
    const itemEventItemCaseConditionModelList = caseConditionModelList.filter(x => x.itemEventItemModel);

    if (itemEventItemCaseConditionModelList.length > 0) {

      conditionSegment.children!.push({
        label: 'Items',
        id: 'Items',
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

  if (standingStatusEffectModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Effects',
      id: 'Effects',
      component: <FactionSourceEffectSegment />
    });
  }

  if (reputationEventModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Events',
      id: 'SourceEvents',
      component: <FactionSourceEventSegment />
    });
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