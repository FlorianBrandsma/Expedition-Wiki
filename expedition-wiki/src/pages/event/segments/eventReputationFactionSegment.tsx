import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { FactionModel } from '../../../data/models/factionModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function EventReputationFactionSegment() {

  const eventPageModel = useEventPageContext();
  const { factionModelList } = eventPageModel;

  const headers = useMemo<HeadCell<FactionModel>[]>(() => [
    { 
      label: 'Name',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignEvents: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink name={row.name} params={['faction', row.name]} />
        </Box>
      )
    },
    {
      id: 'reputation',
      label: 'Reputation',
      align: 'center'
    }
  ], [eventPageModel]);

  return (
    <BasicTable rowKey='id' rows={factionModelList} headCells={headers} />
  )
}