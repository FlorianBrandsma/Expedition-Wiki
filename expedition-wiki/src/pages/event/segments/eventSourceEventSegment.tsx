import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { EventContinuationModel } from '../../../data/models/eventContinuationModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExLink from '../../../components/exLink/exLink';

export default function EventSourceEventSegment() {

  const eventPageModel = useEventPageContext();
  const { sourceEventContinuationModelList } = eventPageModel;

  const headers = useMemo<HeadCell<EventContinuationModel>[]>(() => {
  
    const headers: HeadCell<EventContinuationModel>[] = [
      { 
        label: 'Event', 
        align: 'left',
        render: (row) => (
          <ExLink name={row.eventModel.name} params={row.eventModel.params} />
        )
      }
    ];

    if (sourceEventContinuationModelList.some(model => model.caseConditionModelList.length > 0)) {
      
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
    <BasicTable rowKey="id" rows={sourceEventContinuationModelList} headCells={headers} />
  )
}