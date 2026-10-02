import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { MenuEventEntryModel } from '../../../data/models/menuEventEntryModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function EventMenuEntrySegment() {

  const eventPageModel = useEventPageContext();
  const { menuEventEntryModelList } = eventPageModel;

  const headers = useMemo<HeadCell<MenuEventEntryModel>[]>(() => {
    
    const headers: HeadCell<MenuEventEntryModel>[] = [
      {
        id: 'name',
        label: 'Name',
        align: 'left'
      }
    ]

    if (menuEventEntryModelList.some(x => x.continuationEventModel)) {
      headers.push({
        label: 'Event',
        align: 'left',
        render: (row) => (
          row.continuationEventModel && (
            <ExLink name={row.continuationEventModel.name} params={row.continuationEventModel.params} />
          )
        )
      })
    }

    return headers;

  }, [eventPageModel]);

  return (
    <BasicTable rowKey='id' rows={menuEventEntryModelList} headCells={headers} />
  )
}