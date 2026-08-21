import { useMemo } from 'react';

import { useEquipmentSetPageContext } from '../equipmentSetPageContext';

import type { StatusEffectModel } from '../../../data/models/statusEffectModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EquipmentSetEffectSegment() {

  const equipmentSetPageModel = useEquipmentSetPageContext();
  const { statusEffectModelList } = equipmentSetPageModel;

  const headers = useMemo<HeadCell<StatusEffectModel>[]>(() => [
    { 
      id: 'effectName', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.effectIconResourceName} size={20} />
          <ExLink pageName={'effect'} name={row.effectName} />
        </Box>
      )
    },
    {
      id: 'descriptionComponent',
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent()}
        </Box>
      )
    },
    {
      id: 'stack',
      label: 'Stack',
      align: 'center'
    }
  ], [equipmentSetPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <EnhancedTable rowKey='id' rows={statusEffectModelList} headCells={headers} />
    </Box>
  )
}