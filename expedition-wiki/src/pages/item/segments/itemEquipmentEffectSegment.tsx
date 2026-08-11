import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { StatusEffectModel } from '../../../data/models/statusEffectModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemEquipmentEffectSegment() {

  const itemPageModel = useItemPageContext();
  const { statusEffectModelList } = itemPageModel;

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
  ], [itemPageModel]);

  return (
    <Box sx={{ display: 'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={statusEffectModelList} headCells={headers} />
    </Box>
  )
}