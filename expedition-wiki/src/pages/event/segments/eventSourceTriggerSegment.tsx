import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { InteractionTriggerModel } from '../../../data/models/interactionTriggerModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExLink from '../../../components/exLink/exLink';

export default function EventSourceTriggerSegment() {

  const eventPageModel = useEventPageContext();
  const { sourceInteractionTriggerModelList } = eventPageModel;

  const headers = useMemo<HeadCell<InteractionTriggerModel>[]>(() => {
  
    const headers: HeadCell<InteractionTriggerModel>[] = [
      {
        label: 'Task',
        align: 'left',
        render: (row) => (
          <ExLink name={row.interactionModel.taskModel.name} params={row.interactionModel.taskModel.params}/>
        )
      },
      {
        id: 'interactionTimeDescription',
        label: 'Time',
        align: 'center'
      },
      {
        id: 'typeDescription',
        label: 'Type',
        align: 'left'
      }
    ];
  
    if (sourceInteractionTriggerModelList.some(model => model.inputInteractionTriggerModel)) {
      headers.push({
        label: 'Description',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <Box sx={{ maxWidth:'200px'}}>
            {row.inputInteractionTriggerModel?.description ?? ''}
          </Box>
        )
      });
    }

    headers.push(
      {
        id: 'targetTypeDescription',
        label: 'Target',
        align: 'left'
      },
      {
        id: 'activationTypeDescription',
        label: 'Activation',
        align: 'left'
      }
    );

    if (sourceInteractionTriggerModelList.some(model => model.inputInteractionTriggerModel?.actionDelayModel)) {
      headers.push({
        label: 'Delay',
        align: 'center',
        render: row => row.inputInteractionTriggerModel?.actionDelayModel?.durationDescription ?? ''
      });

      if (sourceInteractionTriggerModelList.some(model => model.inputInteractionTriggerModel.actionDelayModel.cancelDescription)) {
        headers.push({
          label: 'Cancel',
          align: 'center',
          render: row => row.inputInteractionTriggerModel?.actionDelayModel?.cancelDescription ?? ''
        });
      }
    }

    if (sourceInteractionTriggerModelList.some(model => model.caseConditionModelList.length > 0)) {
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
      });
    }

    return headers;

  }, [eventPageModel]);

  return (
    <BasicTable rowKey="id" rows={sourceInteractionTriggerModelList} headCells={headers} />
  )
}