import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { AgentInteractableReactionModel } from '../../../data/models/agentInteractableReactionModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExLink from '../../../components/exLink/exLink';
import ExIcon from '../../../components/exIcon/exIcon';

export default function EventSourceReactionSegment() {

  const eventPageModel = useEventPageContext();
  const { sourceAgentInteractableReactionModelList } = eventPageModel;

  const headers = useMemo<HeadCell<AgentInteractableReactionModel>[]>(() => {
  
    const headers: HeadCell<AgentInteractableReactionModel>[] = [
      { 
        label: 'Interactable', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ExIcon resourceName={row.agentInteractableAssetIconResourceName} size={20} />
            <ExLink name={row.agentInteractableName} params={['interactable', row.agentInteractableName]} />
          </Box>
        )
      }
    ];

    if (sourceAgentInteractableReactionModelList.some(model => model.caseConditionModelList.length > 0)) {
      
      headers.push({
        label: 'Conditions',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <CellTable 
            bulleted
            list={row.caseConditionModelList} 
            component={(caseConditionModel) => caseConditionModel.descriptionComponent}
          />
        )
      })
    }

    return headers;

  }, [eventPageModel]);

  return (
    <BasicTable rowKey="id" rows={sourceAgentInteractableReactionModelList} headCells={headers} />
  )
}