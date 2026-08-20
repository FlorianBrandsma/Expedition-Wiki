import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import type { AbilityEventModel } from '../../../data/models/abilityEventModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
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
      <EnhancedTable rowKey='id' rows={abilityEventModelList} headCells={headers} />
    </Box>
  )
}