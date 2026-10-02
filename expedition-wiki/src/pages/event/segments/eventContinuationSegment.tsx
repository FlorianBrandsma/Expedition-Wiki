import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { EventContinuationModel } from '../../../data/models/eventContinuationModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExLink from '../../../components/exLink/exLink';

export default function EventContinuationSegment() {

  const eventPageModel = useEventPageContext();
  const { eventContinuationModelList } = eventPageModel;

  const headers = useMemo<HeadCell<EventContinuationModel>[]>(() => {
  
    const headers: HeadCell<EventContinuationModel>[] = [
      { 
        label: 'Event', 
        align: 'left',
        render: (row) => (
          <ExLink name={row.continuationEventModel.name} params={row.continuationEventModel.params} />
        )
      }
    ];

    if (eventContinuationModelList.some(model => model.caseConditionModelList.length > 0)) {
      
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
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey="id" rows={eventContinuationModelList} headCells={headers} />
    </Box>
  )
}