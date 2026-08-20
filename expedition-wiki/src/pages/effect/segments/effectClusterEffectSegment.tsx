import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import { StatusEffectModel } from '../../../data/models/statusEffectModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectClusterEffectSegment() {

  const effectPageModel = useEffectPageContext();
  const { statusEffectModelList } = effectPageModel;

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
      id: 'type',
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent()}
        </Box>
      )
    }
  ], [effectPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey='id' rows={statusEffectModelList} headCells={headers} />
    </Box>
  )
}