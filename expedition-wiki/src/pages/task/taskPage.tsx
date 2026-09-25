import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { TaskPageContext } from './taskPageContext';

import { WorldInteractableType, WorldInteractableParentType } from '../../types/enums';

import { TaskPageModel } from '../../data/models/pages/taskPageModel';
import { TaskPageParameters } from '../../data/parameters/pages/taskPageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';

import TaskPropertyCard from './taskPropertyCard';

import GeneralUtilityConditionAbilitySegment from '../general/segments/utility/condition/generalUtilityConditionAbilitySegment';
import GeneralUtilityConditionEventSegment from '../general/segments/utility/condition/generalUtilityConditionEventSegment';
import GeneralUtilityConditionItemSegment from '../general/segments/utility/condition/generalUtilityConditionItemSegment';
import GeneralUtilityConditionLootSegment from '../general/segments/utility/condition/generalUtilityConditionLootSegment';
import GeneralUtilityConditionReactionSegment from '../general/segments/utility/condition/generalUtilityConditionReactionSegment';
import GeneralUtilityConditionTriggerSegment from '../general/segments/utility/condition/generalUtilityConditionTriggerSegment';
import TaskInteractableEffectSegment from './segments/taskInteractableEffectSegment';
import TaskTriggerSegment from './segments/taskTriggerSegment';
import TaskInteractableBehaviourSegment from './segments/taskInteractableBehaviourSegment';
import TaskEventSegment from './segments/taskEventSegment';

export default function TaskPage() {

  const params = useParams<{ 
    worldInteractableType: WorldInteractableType, 
    worldInteractableParentType: WorldInteractableParentType,
    regionName: string,
    terrainName: string,
    questName: string, 
    objectiveName: string,
    interactableName: string,
    taskName: string 
  }>();

  const worldInteractableType       = WorldInteractableType      .findIndex(type => type.toLowerCase() === params.worldInteractableType      ?.toLowerCase());
  const worldInteractableParentType = WorldInteractableParentType.findIndex(type => type.toLowerCase() === params.worldInteractableParentType?.toLowerCase());
  const regionName                  = params.regionName           ?.replaceAll('_', ' ');
  const terrainName                 = params.terrainName          ?.replaceAll('_', ' ');
  const questName                   = params.questName            ?.replaceAll('_', ' ');
  const objectiveName               = params.objectiveName        ?.replaceAll('_', ' ');
  const interactableName            = params.interactableName     ?.replaceAll('_', ' ');
  const taskName                    = params.taskName             ?.replaceAll('_', ' ');
  document.title = `${taskName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new TaskPageParameters({
    gameId:                     [gameModel.id],
    regionName:                  regionName,
    terrainName:                 terrainName,
    questName:                   questName,
    objectiveName:               objectiveName,
    interactableName:            interactableName,
    taskName:                    taskName,
    worldInteractableType:       worldInteractableType,
    worldInteractableParentType: worldInteractableParentType
  });

  const taskPageQuery = useQuery<TaskPageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<TaskPageModel>(parameters, TaskPageModel),
    initialData: []
  });

  if (taskPageQuery.data?.length === 0) return;

  const taskPageModel = taskPageQuery.data[0];

  const { 
    taskModel,
    behaviourInteractionModelList,
    eventModelList,
    interactionTriggerModelList,
    statusEffectModelList,
    caseConditionModelList
  } = taskPageModel;

  const interactableSegment = {
    label: 'Interactable',
    id: 'Interactable',
    children: []
  } as ContentSegment

  if (behaviourInteractionModelList.length > 0) {
    interactableSegment.children!.push({
      label: 'Behaviour',
      id: 'Behaviour',
      component: <TaskInteractableBehaviourSegment />
    })
  }

  if (statusEffectModelList.length > 0) {
    interactableSegment.children!.push({
      label: 'Effects',
      id: 'Effects',
      component: <TaskInteractableEffectSegment />
    })
  }

  if (interactableSegment.children?.length !== 0)
    contentSegments.push(interactableSegment);

  if (eventModelList.length > 0) {
    contentSegments.push({
      label: 'Events',
      id: 'Events',
      component: <TaskEventSegment />
    })
  }

  if (interactionTriggerModelList.length > 0) {
    contentSegments.push({
      label: 'Triggers',
      id: 'Triggers',
      component: <TaskTriggerSegment />
    })
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

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <TaskPageContext.Provider value={taskPageModel} >
          <Typography variant="h5">{taskModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <TaskPropertyCard />

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </TaskPageContext.Provider>
      </Box>
    </Box>
  )
}