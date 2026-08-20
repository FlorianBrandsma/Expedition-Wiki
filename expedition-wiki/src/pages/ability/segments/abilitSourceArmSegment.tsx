import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import type { ArmEquipmentItemModel } from '../../../data/models/armEquipmentItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExLink from '../../../components/exLink/exLink';
import ExIcon from '../../../components/exIcon/exIcon';
import { Box } from '@mui/material';

export default function AbilitySourceArmSegment() {

  const abilityPageModel = useAbilityPageContext();
  const { armEquipmentItemModelList } = abilityPageModel;

  const headers = useMemo<HeadCell<ArmEquipmentItemModel>[]>(() => [
    { 
      id: 'equipmentItemName', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.equipmentItemAssetIconResourceName} size={20} />
          <ExLink pageName={'item'} name={row.equipmentItemName} />
        </Box>
      )
    },
    {
      id: 'typeDescription',
      label: 'Type',
      align: 'left'
    }
  ], [abilityPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey="id" rows={armEquipmentItemModelList} headCells={headers} />
    </Box>
  )
}