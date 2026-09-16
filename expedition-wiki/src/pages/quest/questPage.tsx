import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useGameContext } from '../../context/gameContext';
import { QuestPageContext } from './questPageContext';

import { QuestPageModel } from '../../data/models/pages/questPageModel';
import { QuestPageParameters } from '../../data/parameters/pages/questPageParameters';
import { getData } from '../../services/dataManager';

import type { ContentSegment } from '../../components/contentTable/contentTable';
import ContentTable from '../../components/contentTable/contentTable';
import Segment from '../../components/segment/segment';
import { Divider, Box, Typography } from '@mui/material';
import QuestPropertyCard from './questPropertyCard';
import QuestObjectiveSegment from './segments/questObjectiveSegment';
import QuestRequirementQuestSegment from './segments/questRequirementsQuestSegment';
import QuestRequirementTaskSegment from './segments/questRequirementsTaskSegment';
import QuestUtilityQuestSegment from './segments/questUtilityQuestSegment';

export default function QuestPage() {

  const params = useParams<{ regionName: string, name: string }>();
  
  const name = params.name?.replaceAll('_', ' ');
  document.title = `${name} - Expedition Wiki`;

  const { gameModel } = useGameContext();

  const contentSegments: ContentSegment[] = [];
  
  const parameters = new QuestPageParameters({
    gameId:[gameModel.id],
    name: name
  });

  const questPageQuery = useQuery<QuestPageModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<QuestPageModel>(parameters, QuestPageModel),
    initialData: []
  });

  if (questPageQuery.data?.length === 0) return;

  const questPageModel = questPageQuery.data[0];

  const { 
    questModel,
    objectiveModelList,
    mainQuestModelList
  } = questPageModel;

  const requirementSegment = {
    label: 'Requirements',
    id: 'Requirements',
    children: []
  } as ContentSegment;

  if (questModel.mainQuestModel?.mainQuestModelList.length > 0) {
    requirementSegment.children!.push({
      label: 'Quests',
      id: 'Quests',
      component: <QuestRequirementQuestSegment />
    });
  } 

  if (questModel.sideQuestModel?.taskModelList.length > 0) {
    requirementSegment.children!.push({
      label: 'Tasks',
      id: 'Tasks',
      component: <QuestRequirementTaskSegment />
    });
  } 

  if (requirementSegment.children?.length !== 0)
    contentSegments.push(requirementSegment);

  if (objectiveModelList.length > 0) {
    contentSegments.push({
      label: 'Objectives',
      id: 'Objectives',
      component: <QuestObjectiveSegment />
    })
  }

  if (mainQuestModelList.length > 0) {
    contentSegments.push({
      label: 'Utility',
      id: 'Utility',
      children: [
        {
          label: 'Quests',
          id: 'Quests',
          component: <QuestUtilityQuestSegment />
        }
      ]
    });
  }

  return (
    <Box sx={{ justifyContent: "left"}}>
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <QuestPageContext.Provider value={ questPageModel }>
          <Typography variant="h5">{questModel.name}</Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <QuestPropertyCard />

            {contentSegments.length > 0 && (
              <ContentTable segments={contentSegments} />
            )}

            {contentSegments.map((segment) => (
              <Segment key={segment.id} segment={segment}/>
            ))}

          </Box>
        </QuestPageContext.Provider>
      </Box>
    </Box>
  )
}