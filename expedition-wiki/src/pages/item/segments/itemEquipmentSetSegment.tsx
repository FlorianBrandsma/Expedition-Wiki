import { useMemo } from 'react';

import { useItemContext } from '../itemContext';

import { EquipmentSetModel } from '../../../data/models/equipmentSetModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemEquipmentSetSegment() {

  const { equipmentItemModel } = useItemContext();

  if (!equipmentItemModel) return;

  const headers = useMemo<HeadCell<EquipmentSetModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'set'} name={row.name} />
        </Box>
      )
    }
  ], [equipmentItemModel]);

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={equipmentItemModel.equipmentSetModelList} headCells={headers} />
    </Box>
  )
}