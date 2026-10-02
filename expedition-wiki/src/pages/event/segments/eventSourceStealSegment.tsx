import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { StealItemEventModel } from '../../../data/models/stealItemEventModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function EventSourceStealSegment() {

  const eventPageModel = useEventPageContext();
  const { sourceStealItemEventModelList } = eventPageModel;

  const headers = useMemo<HeadCell<StealItemEventModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.itemEventModel.eventModel.name} params={row.itemEventModel.eventModel.params} />
      )
    }
  ], [eventPageModel]);

  return (
    <BasicTable rowKey="id" rows={sourceStealItemEventModelList} headCells={headers} />
  )
}