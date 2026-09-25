import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import type { CompanionEventModel } from '../../../data/models/companionEventModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function InteractableSourceEventSegment() {

  const interactablePageModel = useInteractablePageContext();
  const { companionEventModelList } = interactablePageModel;

  const headers = useMemo<HeadCell<CompanionEventModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
      )
    }
  ], [interactablePageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={companionEventModelList} headCells={headers} />
    </Box>
  )
}