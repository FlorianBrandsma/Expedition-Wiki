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
    eventModel
  } = eventPageModel;

  if (!eventModel) return;

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