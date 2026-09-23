import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import type { ArmEquipmentItemModel } from '../../../data/models/armEquipmentItemModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import ExIcon from '../../../components/exIcon/exIcon';
import { Box } from '@mui/material';

export default function AbilitySourceArmSegment() {

  const abilityPageModel = useAbilityPageContext();
  const { armEquipmentItemModelList } = abilityPageModel;

  const headers = useMemo<HeadCell<ArmEquipmentItemModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.equipmentItemAssetIconResourceName} size={20} />
          <ExLink name={row.equipmentItemName} params={['item', row.equipmentItemName]} />
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
      <BasicTable rowKey="id" rows={armEquipmentItemModelList} headCells={headers} />
    </Box>
  )
}