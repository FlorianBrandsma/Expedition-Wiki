import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { EquipmentItemModel } from '../../../data/models/equipmentItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceEquipmentSegment() {

  const effectPageModel = useEffectPageContext();
  const { equipmentItemModelList } = effectPageModel;

  const headers = useMemo<HeadCell<EquipmentItemModel>[]>(() => [
    { 
      id: 'itemName', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignEffects: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.itemAssetIconResourceName} size={20} />
          <ExLink pageName={'item'} name={row.itemName} />
        </Box>
      )
    },
    {
      id: 'statusEffectStack',
      label: 'Stack',
      align: 'right'
    }
  ], [effectPageModel]);

  return (
    <Box sx={{ display: 'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={equipmentItemModelList} headCells={headers} />
    </Box>
  )
}