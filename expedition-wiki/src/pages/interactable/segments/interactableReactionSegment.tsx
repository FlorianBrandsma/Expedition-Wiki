import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import type { AgentInteractableReactionModel } from '../../../data/models/agentInteractableReactionModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExLink from '../../../components/exLink/exLink';

export default function InteractableReactionSegment() {

  const interactablePageModel = useInteractablePageContext();
  const { agentInteractableReactionModelList } = interactablePageModel;

  const headers = useMemo<HeadCell<AgentInteractableReactionModel>[]>(() => {

    const headers: HeadCell<AgentInteractableReactionModel>[] = [
      { 
        label: 'Event',
        align: 'left',
        render: (row) => (
          <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
        )
      }
    ];
    
    if (agentInteractableReactionModelList.some(model => model.successChance < 100)) {

      headers.push({
        id: 'successChanceDescription',
        label: 'Success',
        align: 'left'
      })
    }

    if (agentInteractableReactionModelList.some(model => model.caseConditionModelList.length > 0)) {

      headers.push({
        label: 'Conditions',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <Box sx={{ maxWidth:'200px'}}>
            <CellTable 
              bulleted
              list={row.caseConditionModelList} 
              highlited={(caseConditionModel) => caseConditionModel.id === row.id}
              component={(caseConditionModel) => caseConditionModel.descriptionComponent}
            />
          </Box>
        )
      })
    }

    return headers;

  }, [interactablePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={agentInteractableReactionModelList} headCells={headers} />
    </Box>
  )
}