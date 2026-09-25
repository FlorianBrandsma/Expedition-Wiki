import { useMemo } from 'react';

import { useTaskPageContext } from '../taskPageContext';

import type { InteractionTriggerModel } from '../../../data/models/interactionTriggerModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExLink from '../../../components/exLink/exLink';

export default function TaskTriggerSegment() {

  const taskPageModel = useTaskPageContext();
  const { interactionTriggerModelList } = taskPageModel;

  const headers = useMemo<HeadCell<InteractionTriggerModel>[]>(() => {

    const headers: HeadCell<InteractionTriggerModel>[] = [
      {
        id: 'interactionTimeDescription',
        label: 'Time',
        align: 'center'
      },
      {
        label: 'Event',
        align: 'left',
        render: (row) => (
          <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
        )
      },
      {
        id: 'typeDescription',
        label: 'Type',
        align: 'left'
      }
    ];

    if (interactionTriggerModelList.some(model => model.inputInteractionTriggerModel)) {
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

    if (interactionTriggerModelList.some(model => model.inputInteractionTriggerModel?.actionDelayModel)) {
      headers.push({
        label: 'Delay',
        align: 'center',
        render: row => row.inputInteractionTriggerModel?.actionDelayModel?.durationDescription ?? ''
      });

      if (interactionTriggerModelList.some(model => model.inputInteractionTriggerModel.actionDelayModel.cancelDescription)) {
        headers.push({
          label: 'Cancel',
          align: 'center',
          render: row => row.inputInteractionTriggerModel?.actionDelayModel?.cancelDescription ?? ''
        });
      }
    }

    if (interactionTriggerModelList.some(model => model.caseConditionModelList.length > 0)) {
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

  }, [taskPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={interactionTriggerModelList} headCells={headers} />
    </Box>
  )
}