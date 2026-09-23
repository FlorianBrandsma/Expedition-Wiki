import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { EquipmentSetModel } from '../../../data/models/equipmentSetModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemEquipmentSetSegment() {

  const itemPageModel = useItemPageContext();
  const { equipmentSetModelList } = itemPageModel;

  const headers = useMemo<HeadCell<EquipmentSetModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink name={row.name} params={['set', row.name]} />
        </Box>
      )
    }
  ], [itemPageModel]);

  return (
    <Box>
      <BasicTable rowKey="id" rows={equipmentSetModelList} headCells={headers} />
    </Box>
  )
}