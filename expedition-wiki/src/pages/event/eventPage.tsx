import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { EventPageContext } from './eventPageContext';

import { WorldInteractableType, WorldInteractableParentType, EventParentType } from '../../types/enums';

import { EventPageModel } from '../../data/models/pages/eventPageModel';
import { EventPageParameters } from '../../data/parameters/pages/eventPageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';

import EventPropertyCard from './eventPropertyCard';
import { ConvertTime } from '../../services/timeManager';
import EventSpeechTextSegment from './segments/eventSpeechTextSegment';
import EventDialogueSpeechSegment from './segments/eventDialogueSpeechSegment';
import EventMenuEntrySegment from './segments/eventMenuEntrySegment';
import EventMailMessageSegment from './segments/eventMailMessageSegment';
import EventMailItemSegment from './segments/eventMailItemSegment';
import EventStealItemSegment from './segments/eventStealItemSegment';
import EventClaimItemSegment from './segments/eventClaimItemSegment';
import EventTradeItemSegment from './segments/eventTradeItemSegment';
import EventShopItemSegment from './segments/eventShopItemSegment';
import EventCraftItemSegment from './segments/eventCraftItemSegment';
import EventRelinquishItemSegment from './segments/eventRelinquishItemSegment';
import EventDistributeItemSegment from './segments/eventDistributeItemSegment';
import EventEffectEffectSegment from './segments/eventEffectEffectSegment';
import EventAbilityAbilitySegment from './segments/eventAbilityAbilitySegment';
import EventCompanionInteractableSegment from './segments/eventCompanionInteractableSegment';
import EventReputationFactionSegment from './segments/eventReputationFactionSegment';
import GeneralLootTableConditionSegment from '../general/segments/lootTable/generalLootTableConditionSegment';
import GeneralLootTableItemSegment from '../general/segments/lootTable/generalLootTableItemSegment';
import EventSignalReflectionSegment from './segments/eventSignalReflectionSegment';
import EventContinuationSegment from './segments/eventContinuationSegment';
import EventSourceEventSegment from './segments/eventSourceEventSegment';
import EventSourceReactionSegment from './segments/eventSourceReactionSegment';
import EventSourceTriggerSegment from './segments/eventSourceTriggerSegment';
import EventSourceMenuSegment from './segments/eventSourceMenuSegment';
import EventSourceStealSegment from './segments/eventSourceStealSegment';
import EventSourceEffectSegment from './segments/eventSourceEffectSegment';

export default function EventPage() {

  const params = useParams<{ 
    worldInteractableParentType: WorldInteractableParentType,
    worldInteractableType:       WorldInteractableType, 
    eventParentType:             EventParentType,
    regionName: string,
    terrainName: string,
    questName: string, 
    objectiveName: string,
    interactableName: string,
    taskName: string,
    time: string,
    eventName: string 
  }>();

  const worldInteractableType       = WorldInteractableType      .findIndex(type => type.toLowerCase() === params.worldInteractableType      ?.toLowerCase());
  const worldInteractableParentType = WorldInteractableParentType.findIndex(type => type.toLowerCase() === params.worldInteractableParentType?.toLowerCase());
  const eventParentType             = EventParentType            .findIndex(type => type.toLowerCase() === params.eventParentType            ?.toLowerCase());
  const regionName                  = params.regionName           ?.replaceAll('_', ' ');
  const terrainName                 = params.terrainName          ?.replaceAll('_', ' ');
  const questName                   = params.questName            ?.replaceAll('_', ' ');
  const objectiveName               = params.objectiveName        ?.replaceAll('_', ' ');
  const interactableName            = params.interactableName     ?.replaceAll('_', ' ');
  const taskName                    = params.taskName             ?.replaceAll('_', ' ');
  const interactionIsDefault        = params.time === 'Default'
  const interactionStartTime        = params.time ? ConvertTime(params.time).start : undefined
  const interactionEndTime          = params.time ? ConvertTime(params.time).end   : undefined
  const eventName                   = params.eventName            ?.replaceAll('_', ' ');
  document.title = `${eventName} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new EventPageParameters({
    gameId:                     [gameModel.id],
    regionName:                  regionName,
    terrainName:                 terrainName,
    questName:                   questName,
    objectiveName:               objectiveName,
    worldInteractableParentType: worldInteractableParentType,
    worldInteractableType:       worldInteractableType,
    interactableName:            interactableName,
    taskName:                    taskName,
    interactionIsDefault:        interactionIsDefault,
    interactionStartTime:        interactionStartTime,
    interactionEndTime:          interactionEndTime,
    eventName:                   eventName,
    eventParentType:             eventParentType
  });

  const eventPageQuery = useQuery<EventPageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<EventPageModel>(parameters, EventPageModel),
    initialData: []
  });

  if (eventPageQuery.data?.length === 0) return;

  const eventPageModel = eventPageQuery.data[0];

  const { 
    eventModel,
    menuEventEntryModelList,
    dialogueEventSpeechModelList,
    itemModelList,
    itemEventItemModelList,
    effectModelList,
    dischargeAbilityModelList,
    playableCharacterAgentInteractableModelList,
    factionModelList,
    agentInteractableLootTableModelList,
    worldInteractableReflectionModelList,
    eventContinuationModelList,
    sourceAgentInteractableReactionModelList,
    sourceEventContinuationModelList,
    sourceInteractionTriggerModelList,
    sourceMenuEventEntryModelList,
    sourceStealItemEventModelList,
    sourceEventEffectModelList
  } = eventPageModel;

  if (!eventModel) return;

  if (menuEventEntryModelList.length > 0) {
    contentSegments.push({
      label: 'Menu',
      id: 'Menu',
      children: [{
        label: 'Entries',
        id: 'Menu/Entries',
        component: <EventMenuEntrySegment />
      }]   
    })
  }

  if (eventModel.speechEventModel) {
    contentSegments.push({
      label: 'Speech',
      id: 'Speech',
      children: [{
        label: 'Text',
        id: 'Speech/Text',
        component: <EventSpeechTextSegment />
      }]   
    })
  }

  if (dialogueEventSpeechModelList.length > 0) {
    contentSegments.push({
      label: 'Dialogue',
      id: 'Dialogue',
      children: [{
        label: 'Speech',
        id: 'Dialogue/Speech',
        component: <EventDialogueSpeechSegment />
      }]   
    })
  }

  const mailSegment = {
    label: 'Mail',
    id: 'Mail',
    children: []
  } as ContentSegment;

  if (eventModel.mailEventModel) {
    mailSegment.children!.push({
      label: 'Message',
      id: `${mailSegment.id}/Message`,
      component: <EventMailMessageSegment />
    });
  }

  if (itemModelList.length > 0) {
    mailSegment.children!.push({
      label: 'Items',
      id: `${mailSegment.id}/Items`,
      component: <EventMailItemSegment />
    });
  }

  if (mailSegment.children?.length !== 0)
    contentSegments.push(mailSegment);

  if (eventModel.itemEventModel && itemEventItemModelList.length > 0) {

    if (eventModel.itemEventModel.stealItemEventModel) {
      contentSegments.push({
        label: 'Steal',
        id: 'Steal',
        children: [{
          label: 'Items',
          id: 'Steal/Items',
          component: <EventStealItemSegment />
        }]
      })
    }

    if (eventModel.itemEventModel.claimItemEventModel) {
      contentSegments.push({
        label: 'Claim',
        id: 'Claim',
        children: [{
          label: 'Items',
          id: 'Claim/Items',
          component: <EventClaimItemSegment />
        }]
      })
    }

    if (eventModel.itemEventModel.tradeItemEventModel) {
      contentSegments.push({
        label: 'Trade',
        id: 'Trade',
        children: [{
          label: 'Items',
          id: 'Trade/Items',
          component: <EventTradeItemSegment />
        }]
      })
    }

    if (eventModel.itemEventModel.shopItemEventModel) {
      contentSegments.push({
        label: 'Shop',
        id: 'Shop',
        children: [{
          label: 'Items',
          id: 'Shop/Items',
          component: <EventShopItemSegment />
        }]
      })
    }

    if (eventModel.itemEventModel.craftItemEventModel) {
      contentSegments.push({
        label: 'Craft',
        id: 'Craft',
        children: [{
          label: 'Items',
          id: 'Craft/Items',
          component: <EventCraftItemSegment />
        }]
      })
    }

    if (eventModel.itemEventModel.relinquishItemEventModel) {
      contentSegments.push({
        label: 'Relinquish',
        id: 'Relinquish',
        children: [{
          label: 'Items',
          id: 'Relinquish/Items',
          component: <EventRelinquishItemSegment />
        }]
      })
    }

    if (eventModel.itemEventModel.distributeItemEventModel) {
      contentSegments.push({
        label: 'Distribute',
        id: 'Distribute',
        children: [{
          label: 'Items',
          id: 'Distribute/Items',
          component: <EventDistributeItemSegment />
        }]
      })
    }
  }

  if (effectModelList.length > 0) {
    contentSegments.push({
      label: 'Effect',
      id: 'Effect',
      children: [{
        label: 'Effects',
        id: 'Effect/Effects',
        component: <EventEffectEffectSegment />
      }]
    })
  }

  if (dischargeAbilityModelList.length > 0) {
    contentSegments.push({
      label: 'Ability',
      id: 'Ability',
      children: [{
        label: 'Abilities',
        id: 'Ability/Abilities',
        component: <EventAbilityAbilitySegment />
      }]
    })
  }

  if (playableCharacterAgentInteractableModelList.length > 0) {
    contentSegments.push({
      label: 'Companion',
      id: 'Companion',
      children: [{
        label: 'Interactables',
        id: 'Companion/Interactables',
        component: <EventCompanionInteractableSegment />
      }]
    })
  }

  if (factionModelList.length > 0) {
    contentSegments.push({
      label: 'Reputation',
      id: 'Reputation',
      children: [{
        label: 'Factions',
        id: 'Reputation/Factions',
        component: <EventReputationFactionSegment />
      }]
    })
  }

  if (agentInteractableLootTableModelList.length > 0) {
  
    contentSegments!.push({
      label: 'Loot',
      id: 'Loot',
      children: agentInteractableLootTableModelList.map(agentInteractableLootTableModel => {

        const id = `Loot/${agentInteractableLootTableModel.name}`;

        const children: ContentSegment[] = [];

        if (agentInteractableLootTableModel.caseConditionModelList.length > 0) {

          children.push({
            label: 'Conditions',
            id: `${id}/Conditions`,
            component: <GeneralLootTableConditionSegment caseConditionModelList={agentInteractableLootTableModel.caseConditionModelList} />
          })
        }

        if (agentInteractableLootTableModel.itemModelList.length > 0) {

          children.push({
            label: 'Items',
            id: `${id}/Items`,
            component: <GeneralLootTableItemSegment itemModelList={agentInteractableLootTableModel.itemModelList}/>
          })
        }

        return {
          label: agentInteractableLootTableModel.name,
          id: id,
          children: children
        } as ContentSegment;
      })  
    });
  }

  if (worldInteractableReflectionModelList.length > 0) {
    contentSegments.push({
      label: 'Signal',
      id: 'Signal',
      children: [{
        label: 'Reflections',
        id: 'Signal/Reflections',
        component: <EventSignalReflectionSegment />
      }]   
    })
  }

  if (eventContinuationModelList.length > 0) {
    contentSegments.push({
      label: 'Continuation',
      id: 'Continuation',
      component: <EventContinuationSegment />
    })
  }
  
  const sourceSegment = {
    label: 'Source',
    id: 'Source',
    children: []
  } as ContentSegment;

  if (sourceAgentInteractableReactionModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Reactions',
      id: `${sourceSegment.id}/Reactions`,
      component: <EventSourceReactionSegment />
    })
  }

  if (sourceEventContinuationModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Events',
      id: `${sourceSegment.id}/Events`,
      component: <EventSourceEventSegment />
    })
  }

  if (sourceInteractionTriggerModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Triggers',
      id: `${sourceSegment.id}/Triggers`,
      component: <EventSourceTriggerSegment />
    })
  }

  if (sourceMenuEventEntryModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Menus',
      id: `${sourceSegment.id}/Menus`,
      component: <EventSourceMenuSegment />
    })
  }

  if (sourceStealItemEventModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Steal',
      id: `${sourceSegment.id}/Steal`,
      component: <EventSourceStealSegment />
    })
  }

  if (sourceEventEffectModelList.length > 0) {
    sourceSegment.children!.push({
      label: 'Effects',
      id: `${sourceSegment.id}/Effects`,
      component: <EventSourceEffectSegment />
    })
  }

  if (sourceSegment.children?.length !== 0)
    contentSegments.push(sourceSegment);

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <EventPageContext.Provider value={eventPageModel} >
          <Typography variant="h5">{eventModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <EventPropertyCard />

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </EventPageContext.Provider>
      </Box>
    </Box>
  )
}