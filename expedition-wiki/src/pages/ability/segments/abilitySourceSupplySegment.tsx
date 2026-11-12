import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import type { SupplyItemModel } from '../../../data/models/supplyItemModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import ExIcon from '../../../components/exIcon/exIcon';
import { Box } from '@mui/material';

export default function AbilitySourceSupplySegment() {

  const abilityPageModel = useAbilityPageContext();
  const { supplyItemModelList } = abilityPageModel;

  const headers = useMemo<HeadCell<SupplyItemModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.itemAssetIconResourceName} size={20} />
          <ExLink name={row.itemName} params={['item', row.itemName]} />
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
    <BasicTable rows={supplyItemModelList} headCells={headers} />
  )
}