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

  const { taskModel } = useTaskPageContext();

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
              <ExIcon resourceName={taskModel.worldInteractableIconResourceName} size={20} />
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
            <ExCardTableRow 
              label='Objective'
              value={
                <ExLink 
                  name={taskModel.objectiveName} 
                  params={[
                    'objective', 
                    taskModel.questName, 
                    taskModel.objectiveName
                  ]} 
                />
              }
            />
          </>
        )}
        <ExCardTableRow 
          label='Progression'
          value={taskModel.completeObjective ? 'Yes' : 'No' }
        />
      </ExCardTable>
    </ExCard>
  )
}