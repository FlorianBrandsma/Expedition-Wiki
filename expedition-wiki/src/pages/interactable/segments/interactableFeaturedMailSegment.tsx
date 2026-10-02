import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import type { MailEventModel } from '../../../data/models/mailEventModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function InteractableFeaturedMailSegment() {

  const interactablePageModel = useInteractablePageContext();
  const { mailEventModelList } = interactablePageModel;

  const headers = useMemo<HeadCell<MailEventModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
      )
    },
    {
      id: 'subjectText',
      label: 'Subject',
      align: 'left'
    }
  ], [interactablePageModel]);

  return (
    <BasicTable rowKey='id' rows={mailEventModelList} headCells={headers} />
  )
}