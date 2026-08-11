import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { EquipmentSetModel } from '../../../data/models/equipmentSetModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemEquipmentSetSegment() {

  const itemPageModel = useItemPageContext();
  const { equipmentSetModelList } = itemPageModel;

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
  ], [itemPageModel]);

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={equipmentSetModelList} headCells={headers} />
    </Box>
  )
}