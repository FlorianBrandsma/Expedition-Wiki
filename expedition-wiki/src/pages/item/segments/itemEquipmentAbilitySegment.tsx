import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { DischargeAbilityModel } from '../../../data/models/dischargeAbilityModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemEquipmentAbilitySegment() {

  const itemPageModel = useItemPageContext();
  const { dischargeAbilityModelList } = itemPageModel;

  const headers = useMemo<HeadCell<DischargeAbilityModel>[]>(() => [
    { 
      id: 'abilityName', 
      label: 'Name',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.abilityIconResourceName} size={20} />
          <ExLink pageName={'ability'} name={row.abilityName} />
        </Box>
      )
    },
    {
      id: 'abilityDescription',
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' }
    }
  ], [itemPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey='id' rows={dischargeAbilityModelList} headCells={headers} />
    </Box>
  )
}