import { useMemo } from 'react';

import { useClassPageContext } from '../classPageContext';

import type { DischargeAbilityModel } from '../../../data/models/dischargeAbilityModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ClassAbilitySegment() {

  const classPageModel = useClassPageContext();
  const { dischargeAbilityModelList } = classPageModel;

  const headers = useMemo<HeadCell<DischargeAbilityModel>[]>(() => [
    { 
      label: 'Name',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
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
  ], [classPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={dischargeAbilityModelList} headCells={headers} />
    </Box>
  )
}