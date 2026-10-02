import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { MenuEventEntryModel } from '../../../data/models/menuEventEntryModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function EventSourceMenuSegment() {

  const eventPageModel = useEventPageContext();
  const { sourceMenuEventEntryModelList } = eventPageModel;

  const headers = useMemo<HeadCell<MenuEventEntryModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.menuEventModel.eventModel.name} params={row.menuEventModel.eventModel.params} />
      )
    },
    { 
      id: 'name',
      label: 'Entry', 
      align: 'left'
    }
  ], [eventPageModel]);

  return (
    <BasicTable rowKey="id" rows={sourceMenuEventEntryModelList} headCells={headers} />
  )
}