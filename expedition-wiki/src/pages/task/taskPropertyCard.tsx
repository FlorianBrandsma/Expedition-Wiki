import { useTaskPageContext } from './taskPageContext';

import { WorldInteractableParentType, WorldInteractableType } from '../../types/enums';

import { Box } from '@mui/material';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExLink from '../../components/exLink/exLink';
import ExIcon from '../../components/exIcon/exIcon';

export default function TaskPropertyCard() {

  const { taskModel, taskModelList, objectiveModelList } = useTaskPageContext();

  const currentObjectiveModel = objectiveModelList.find(x => x.orderNumber === (taskModel.objectiveOrderNumber));
  const nextObjectiveModel    = objectiveModelList.find(x => x.orderNumber === (taskModel.objectiveOrderNumber + 1));

  const previousTaskModel = taskModelList.find(x => x.orderNumber === (taskModel.orderNumber - 1));
  const nextTaskModel     = taskModelList.find(x => x.orderNumber === (taskModel.orderNumber + 1));

  return (
    <ExCard sx={{ 
        float: 'right', 
        width: '250px',
        ml: 1, mb: 1
      }}
    >
      {/* Properties */}
      <ExCardHeader title='Properties' /> 
      <ExCardTable>
        <ExCardTableRow 
          label='Interactable' 
          value={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {taskModel.worldInteractableIconResourceName && (
                <ExIcon resourceName={taskModel.worldInteractableIconResourceName} size={20} />
              )}
              <ExLink 
                name={taskModel.worldInteractableName} 
                params={[
                  taskModel.originType,
                  ...taskModel.parentParams,
                  'interactable',
                  WorldInteractableType      [taskModel.worldInteractableType]      .toLowerCase(),
                  WorldInteractableParentType[taskModel.worldInteractableParentType].toLowerCase(),
                  taskModel.worldInteractableName
                ]}
              />
            </Box>
          }
        />
        {taskModel.originType === 'objective' && (
          <>
            <ExCardTableRow 
              label='Quest'
              value={
                <ExLink 
                  name={taskModel.questName} 
                  params={[
                    'quest', 
                    taskModel.questName
                  ]} 
                />
              }
            />
          </>
        )}
      </ExCardTable>
      {/* Objectives */}
      {objectiveModelList.length > 0 && (
        <>
          <ExCardHeader title='Objectives' /> 
          <ExCardTable>
            <ExCardTableRow 
              label='Completion'
              value={taskModel.completeObjective ? 'Yes' : 'No' }
            />
            {currentObjectiveModel && (
              <ExCardTableRow 
                label='Current' 
                value={<ExLink name={currentObjectiveModel.name} params={currentObjectiveModel.params} />}
              />
            )}
            {taskModel.completeObjective && nextObjectiveModel && (
              <ExCardTableRow 
                label='Next' 
                value={<ExLink name={nextObjectiveModel.name} params={nextObjectiveModel.params}/>}
              />
            )}
          </ExCardTable>
        </>
      )}
      {/* Tasks */}
      {taskModelList.length > 0 && (
        <>
          <ExCardHeader title='Tasks' /> 
          <ExCardTable>
            {previousTaskModel && (
              <ExCardTableRow 
                label='Previous' 
                value={<ExLink name={previousTaskModel.name} params={previousTaskModel.params} />}
              />
            )}
            {nextTaskModel && (
              <ExCardTableRow 
                label='Next' 
                value={<ExLink name={nextTaskModel.name} params={nextTaskModel.params}/>}
              />
            )}
          </ExCardTable>
        </>
      )}
    </ExCard>
  )
}