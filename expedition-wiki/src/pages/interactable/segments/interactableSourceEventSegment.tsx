import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import type { CompanionEventModel } from '../../../data/models/companionEventModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import { Box } from '@mui/material';

export default function InteractableSourceEventSegment() {

  const interactablePageModel = useInteractablePageContext();
  const { companionEventModelList } = interactablePageModel;

  const headers = useMemo<HeadCell<CompanionEventModel>[]>(() => [
    { 
      id: 'eventName', 
      label: 'Name', 
      align: 'left'
    }
  ], [interactablePageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={companionEventModelList} headCells={headers} />
    </Box>
  )
}