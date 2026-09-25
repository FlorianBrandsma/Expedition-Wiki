import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import type { AbilityEventModel } from '../../../data/models/abilityEventModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function AbilitySourceEventSegment() {

  const abilityPageModel = useAbilityPageContext();
  const { abilityEventModelList } = abilityPageModel;

  const headers = useMemo<HeadCell<AbilityEventModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
      )
    }
  ], [abilityPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={abilityEventModelList} headCells={headers} />
    </Box>
  )
}