import { useMemo } from 'react';

import { ItemComponentModel } from '../../../data/models/itemComponentModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

interface ItemCraftSegmentProps {
  itemComponentModelList: ItemComponentModel[];
}

export default function ItemCraftSegment(props: ItemCraftSegmentProps) {

  const { itemComponentModelList } = props;

  const headers = useMemo<HeadCell<ItemComponentModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.componentItemAssetIconResourceName} size={20} />
          <ExLink name={row.componentItemName} params={['item', row.componentItemName]} />
        </Box>
      )
    },
    {
      id: 'quantity',
      label: 'Quantity',
      align: 'right'
    }
  ], [itemComponentModelList]);

  return (
    <Box>
      <BasicTable rowKey="id" rows={itemComponentModelList} headCells={headers} />
    </Box>
  )
}