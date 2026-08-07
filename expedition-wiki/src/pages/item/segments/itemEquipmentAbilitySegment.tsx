import { useMemo } from 'react';

import { useItemContext } from '../itemContext';

import { AbilityModel } from '../../../data/models/abilityModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemEquipmentAbilitySegment() {

  const { equipmentItemModel } = useItemContext();

  if (!equipmentItemModel?.armEquipmentItemModel) return;

  const headers = useMemo<HeadCell<AbilityModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'ability'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'description',
      label: 'Description',
      align: 'left'
    }
  ], [equipmentItemModel]);

  return (
    <Box sx={{ display: 'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={equipmentItemModel.armEquipmentItemModel.dischargeAbilityModelList} headCells={headers} />
    </Box>
  )
}