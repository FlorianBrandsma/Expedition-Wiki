import { useMemo } from 'react';

import { useItemContext } from '../itemContext';

import { EffectModel } from '../../../data/models/effectModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemEquipmentEffectSegment() {

  const { equipmentItemModel } = useItemContext();

  if (!equipmentItemModel?.armEquipmentItemModel) return;

  const headers = useMemo<HeadCell<EffectModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'effect'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'typeDescription',
      label: 'Type',
      align: 'left'
    },
    {
      id: 'type',
      label: 'Description',
      align: 'left',
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent()}
        </Box>
      )
    },
    {
      id: 'stack',
      label: 'Stack',
      align: 'center',
      render: (row) => (
        <>
          {`${row.stack}/${row.stackLimit}`}
        </>
      )
    }
  ], [equipmentItemModel]);

  return (
    <Box sx={{ display: 'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={equipmentItemModel.effectModelList} headCells={headers} />
    </Box>
  )
}