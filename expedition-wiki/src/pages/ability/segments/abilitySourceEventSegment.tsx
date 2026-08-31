import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import type { AbilityEventModel } from '../../../data/models/abilityEventModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import { Box } from '@mui/material';

export default function AbilitySourceEventSegment() {

  const abilityPageModel = useAbilityPageContext();
  const { abilityEventModelList } = abilityPageModel;

  const headers = useMemo<HeadCell<AbilityEventModel>[]>(() => [
    { 
      id: 'eventName', 
      label: 'Name', 
      align: 'left'
    }
  ], [abilityPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={abilityEventModelList} headCells={headers} />
    </Box>
  )
}