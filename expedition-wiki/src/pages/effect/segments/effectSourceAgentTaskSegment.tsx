import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { InteractionModel } from '../../../data/models/interactionModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function EffectSourceAgentTaskSegment() {

  const effectPageModel = useEffectPageContext();
  const { interactionModelList } = effectPageModel;

  const headers = useMemo<HeadCell<InteractionModel>[]>(() => {
    
    const headers: HeadCell<InteractionModel>[] = [
      { 
        label: 'Agent', 
        align: 'left',
        render: (row) => {

          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ExIcon resourceName={row.taskModel.worldInteractableIconResourceName} size={20} />
              <ExLink name={row.taskModel.worldInteractableName} params={[ 'interactable', row.taskModel.worldInteractableName ]} />
            </Box>
          )
        }
      },
      { 
        label: 'Task', 
        align: 'left',
        render: (row) => (
          <ExLink name={row.taskModel.name} params={row.taskModel.params} />
        )
      },
      { 
        id: 'timeDescription', 
        label: 'Time', 
        align: 'left'
      },
      {
        id: 'statusEffectStateDescription',
        label: 'State',
        align: 'left'
      },
      {
        id: 'statusEffectStack',
        label: 'Stack',
        align: 'center'
      }
    ]

    if (interactionModelList.some(model => model.activeStatusEffectRepetitionTime > 0)) {
      headers.push({
        id: 'activeStatusEffectRepetitionTimeDescription',
        label: 'Repetition',
        align: 'center'
      })
    }

    return headers;

  }, [effectPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={interactionModelList} headCells={headers} />
    </Box>
  )
}