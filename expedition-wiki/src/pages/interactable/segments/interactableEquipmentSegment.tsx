import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import type { EquipmentItemModel } from '../../../data/models/equipmentItemModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function InteractableEquipmentSegment() {

  const interactablePageModel = useInteractablePageContext();
  const { equipmentItemModelList } = interactablePageModel;

  const headers = useMemo<HeadCell<EquipmentItemModel>[]>(() => [
    { 
      label: 'Item', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignInteractables: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.itemAssetIconResourceName} size={20} />
          <ExLink name={row.itemName} params={['item', row.itemName]} />
        </Box>
      )
    },
    {
      id: 'equipmentSlotTypeDescription',
      label: 'Slot',
      align: 'left'
    }
  ], [interactablePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey="equipmentSlotType" rows={equipmentItemModelList} headCells={headers} />
    </Box>
  )
}