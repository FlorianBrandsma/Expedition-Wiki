import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { EquipmentSetModel } from '../../../data/models/equipmentSetModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceSetSegment() {

  const effectPageModel = useEffectPageContext();
  const { equipmentSetModelList } = effectPageModel;

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
    },
    {
      id: 'statusEffectStack',
      label: 'Stack',
      align: 'center'
    }
  ], [effectPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={equipmentSetModelList} headCells={headers} />
    </Box>
  )
}