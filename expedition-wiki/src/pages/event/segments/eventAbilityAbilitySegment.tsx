import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { DischargeAbilityModel } from '../../../data/models/dischargeAbilityModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function EventAbilityAbilitySegment() {

  const eventPageModel = useEventPageContext();
  const { dischargeAbilityModelList } = eventPageModel;

  const headers = useMemo<HeadCell<DischargeAbilityModel>[]>(() => [
    { 
      label: 'Name',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignEvents: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.abilityIconResourceName} size={20} />
          <ExLink name={row.abilityName} params={['ability', row.abilityName]} />
        </Box>
      )
    },
    {
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px' }}>
          {row.abilityDescription}
        </Box>
      )
    }
  ], [eventPageModel]);

  return (
    <BasicTable rowKey='id' rows={dischargeAbilityModelList} headCells={headers} />
  )
}