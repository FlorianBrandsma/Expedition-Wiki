import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { RepeatStatusEffectModel } from '../../../data/models/repeatStatusEffectModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceEffectRepeatSegment() {

  const effectPageModel = useEffectPageContext();
  const { effectModel, repeatStatusEffectModelList } = effectPageModel;

  const headers = useMemo<HeadCell<RepeatStatusEffectModel>[]>(() => [
    { 
      id: 'statusEffectName', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.statusEffectIconResourceName} size={20} />
          <ExLink pageName={'effect'} name={row.statusEffectName} />
        </Box>
      )
    },
    {
      id: 'descriptionComponent',
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent(effectModel.stack)}
        </Box>
      )
    }
  ], [effectPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey='id' rows={repeatStatusEffectModelList} headCells={headers} />
    </Box>
  )
}