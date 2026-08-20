import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { AtmosphereModel } from '../../../data/models/atmosphereModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box } from '@mui/material';

export default function EffectSourceAtmosphereSegment() {

  const effectPageModel = useEffectPageContext();
  const { atmosphereModelList } = effectPageModel;

  const headers = useMemo<HeadCell<AtmosphereModel>[]>(() => [
    { 
      id: 'id', 
      label: 'Name', 
      align: 'left',
      render: () => (
        <>???</>
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
      <EnhancedTable rowKey='id' rows={atmosphereModelList} headCells={headers} />
    </Box>
  )
}