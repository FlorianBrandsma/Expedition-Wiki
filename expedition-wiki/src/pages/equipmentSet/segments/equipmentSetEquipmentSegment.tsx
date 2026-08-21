import { useMemo } from 'react';

import { useEquipmentSetPageContext } from '../equipmentSetPageContext';

import type { EquipmentItemModel } from '../../../data/models/equipmentItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EquipmentSetEquipmentSegment() {

  const equipmentSetPageModel = useEquipmentSetPageContext();
  const { equipmentItemModelList } = equipmentSetPageModel;

  const headers = useMemo<HeadCell<EquipmentItemModel>[]>(() => [
    { 
      id: 'itemName', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.itemAssetIconResourceName} size={20} />
          <ExLink pageName={'item'} name={row.itemName} />
        </Box>
      )
    },
    {
      id: 'equipmentSlotTypeDescription',
      label: 'Slot',
      align: 'left'
    }
  ], [equipmentSetPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <EnhancedTable rowKey='equipmentSlotType' rows={equipmentItemModelList} headCells={headers} />
    </Box>
  )
}