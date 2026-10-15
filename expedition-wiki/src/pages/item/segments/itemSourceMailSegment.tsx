import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { MailEventModel } from '../../../data/models/mailEventModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function ItemSourceMailSegment() {

  const itemPageModel = useItemPageContext();
  const { mailEventModelList } = itemPageModel;

  const headers = useMemo<HeadCell<MailEventModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
      )
    },
    {
      id: 'itemQuantity',
      label: 'Quantity',
      align: 'right'
    }
  ], [itemPageModel]);

  return (
    <BasicTable rows={mailEventModelList} headCells={headers} />
  )
}