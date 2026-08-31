import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { SpellDischargeAbilityModel } from '../../../data/models/spellDischargeAbilityModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemSupplyAbilitySegment() {

  const itemPageModel = useItemPageContext();
  const { spellDischargeAbilityModelList } = itemPageModel;
  
  const headers = useMemo<HeadCell<SpellDischargeAbilityModel>[]>(() => [
    { 
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
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px' }}>
          {row.abilityDescription}
        </Box>
      )
    }
  ], [itemPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={spellDischargeAbilityModelList} headCells={headers} />
    </Box>
  )
}